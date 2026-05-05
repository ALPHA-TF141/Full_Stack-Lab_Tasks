const cors = require('cors');
const express = require('express');
require('dotenv').config();

const pool = require('./db');
const { sendOtpEmail } = require('./mailer');
const events = require('./events');

const app = express();
const port = Number(process.env.SERVER_PORT || 5000);
const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

app.use(cors());
app.use(express.json());

const getEventAvailability = async () => {
  const [rows] = await pool.execute(
    'SELECT event_name, COALESCE(SUM(tickets), 0) AS booked_tickets FROM bookings GROUP BY event_name'
  );
  const bookedByEvent = rows.reduce((eventTotals, row) => ({
    ...eventTotals,
    [row.event_name]: Number(row.booked_tickets)
  }), {});

  return events.map((event) => {
    const bookedTickets = bookedByEvent[event.name] || 0;

    return {
      ...event,
      bookedTickets,
      availableTickets: Math.max(event.totalTickets - bookedTickets, 0)
    };
  });
};

const findLiveEvent = async (eventId) => {
  const liveEvents = await getEventAvailability();
  return liveEvents.find((event) => event.id === eventId);
};

app.get('/api/health', asyncHandler(async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
}));

app.get('/api/events', asyncHandler(async (req, res) => {
  res.json(await getEventAvailability());
}));

app.get('/api/bookings', asyncHandler(async (req, res) => {
  const [rows] = await pool.execute(
    `SELECT
      id,
      booking_code AS bookingCode,
      name,
      email,
      department,
      event_name AS eventName,
      venue,
      ticket_price AS ticketPrice,
      tickets,
      total_amount AS totalAmount,
      ticket_start_number AS ticketStartNumber,
      ticket_end_number AS ticketEndNumber,
      dispatched_at AS dispatchedAt
    FROM bookings
    ORDER BY dispatched_at DESC, id DESC`
  );

  res.json(rows);
}));

app.post('/api/otp/send', asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await sendOtpEmail(email, otp);
  const [result] = await pool.execute(
    'INSERT INTO otp_verifications (email, otp_code) VALUES (?, ?)',
    [email, otp]
  );

  res.status(201).json({
    message: 'OTP sent successfully to your email',
    otpVerificationId: result.insertId
  });
}));

app.post('/api/otp/verify', asyncHandler(async (req, res) => {
  const { email, otp, otpVerificationId } = req.body;

  if (!email || !otp || !otpVerificationId) {
    return res.status(400).json({ message: 'Email, OTP, and OTP verification id are required' });
  }

  const [rows] = await pool.execute(
    'SELECT id FROM otp_verifications WHERE id = ? AND email = ? AND otp_code = ?',
    [otpVerificationId, email, otp]
  );

  if (rows.length === 0) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  await pool.execute(
    'UPDATE otp_verifications SET is_verified = TRUE, verified_at = NOW() WHERE id = ?',
    [otpVerificationId]
  );

  res.json({ message: 'OTP verified successfully', otpVerificationId });
}));

app.post('/api/bookings', asyncHandler(async (req, res) => {
  const {
    name,
    email,
    department,
    eventId,
    tickets,
    otpVerificationId
  } = req.body;

  const ticketCount = Number(tickets);

  if (!name || !email || !department || !eventId || !otpVerificationId) {
    return res.status(400).json({ message: 'All booking fields are required' });
  }

  const event = await findLiveEvent(eventId);

  if (!event) {
    return res.status(400).json({ message: 'Selected event is not available' });
  }

  if (!Number.isInteger(ticketCount) || ticketCount <= 0) {
    return res.status(400).json({ message: 'Tickets must be a positive number' });
  }

  if (ticketCount > event.availableTickets) {
    return res.status(400).json({
      message: `Only ${event.availableTickets} tickets are available for ${event.name}`
    });
  }

  const [verifiedRows] = await pool.execute(
    'SELECT id FROM otp_verifications WHERE id = ? AND email = ? AND is_verified = TRUE',
    [otpVerificationId, email]
  );

  if (verifiedRows.length === 0) {
    return res.status(400).json({ message: 'OTP is not verified for this email' });
  }

  const [lastRows] = await pool.execute(
    'SELECT ticket_end_number FROM bookings ORDER BY id DESC LIMIT 1'
  );

  const ticketStartNumber = lastRows.length ? lastRows[0].ticket_end_number + 1 : 1;
  const ticketEndNumber = ticketStartNumber + ticketCount - 1;
  const totalAmount = ticketCount * event.price;
  const bookingCode = `BK${Date.now()}`;

  const [result] = await pool.execute(
    `INSERT INTO bookings
      (booking_code, otp_verification_id, name, email, department, event_name, venue,
       ticket_price, tickets, total_amount, ticket_start_number, ticket_end_number)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      bookingCode,
      otpVerificationId,
      name,
      email,
      department,
      event.name,
      event.venue,
      event.price,
      ticketCount,
      totalAmount,
      ticketStartNumber,
      ticketEndNumber
    ]
  );

  res.status(201).json({
    id: result.insertId,
    bookingCode,
    name,
    email,
    department,
    eventId: event.id,
    eventName: event.name,
    venue: event.venue,
    tickets: ticketCount,
    totalAmount,
    availableTickets: event.availableTickets - ticketCount,
    ticketStartNumber,
    ticketEndNumber,
    otpVerificationId
  });
}));

app.get('/api/bookings/latest', asyncHandler(async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT * FROM bookings ORDER BY dispatched_at DESC, id DESC LIMIT 1'
  );
  res.json(rows[0] || null);
}));

app.get('/api/otp/verified', asyncHandler(async (req, res) => {
  const [rows] = await pool.execute(
    'SELECT id, email, verified_at FROM otp_verifications WHERE is_verified = TRUE ORDER BY verified_at DESC'
  );
  res.json(rows);
}));

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Server error', error: error.message });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
