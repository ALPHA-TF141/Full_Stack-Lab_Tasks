import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import EventDetails from './EventDetails';
import BookingForm from './BookingForm';
import VenueMap from './VenueMap';
import Chatbot from './Chatbot';
import defaultEvents from './events';

function App() {
  const [events, setEvents] = useState(defaultEvents);
  const [selectedEventId, setSelectedEventId] = useState(defaultEvents[0].id);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    tickets: ''
  });
  const [errors, setErrors] = useState({});
  const [bookingSummary, setBookingSummary] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpVerificationId, setOtpVerificationId] = useState(null);

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId) || events[0],
    [events, selectedEventId]
  );

  const refreshEvents = useCallback(async () => {
    try {
      setIsLoadingEvents(true);
      const response = await fetch('/api/events');
      const latestEvents = await response.json();

      if (!response.ok) {
        throw new Error(latestEvents.message || 'Unable to load events');
      }

      const eventsWithMapDetails = latestEvents.map((event) => ({
        ...defaultEvents.find((defaultEvent) => defaultEvent.id === event.id),
        ...event
      }));

      setEvents(eventsWithMapDetails);
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        events: 'Using local event list because live event count could not be loaded.'
      }));
    } finally {
      setIsLoadingEvents(false);
    }
  }, []);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  const refreshBookings = useCallback(async () => {
    try {
      setIsLoadingBookings(true);
      const response = await fetch('/api/bookings');
      const latestBookings = await response.json();

      if (!response.ok) {
        throw new Error(latestBookings.message || 'Unable to load bookings');
      }

      setBookings(latestBookings);
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        bookings: 'Unable to load booking sheet from database.'
      }));
    } finally {
      setIsLoadingBookings(false);
    }
  }, []);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    const tickets = parseInt(formData.tickets);
    if (!formData.tickets || tickets <= 0) {
      newErrors.tickets = 'Number of tickets must be a positive number';
    } else if (tickets > selectedEvent.availableTickets) {
      newErrors.tickets = `Only ${selectedEvent.availableTickets} tickets available for ${selectedEvent.name}`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOtpVerified = useCallback((verified, verifiedId) => {
    setIsOtpVerified(verified);
    setOtpVerificationId(verifiedId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!isOtpVerified || !otpVerificationId) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          otp: 'Please verify your email OTP before booking tickets'
        }));
        return;
      }

      const tickets = parseInt(formData.tickets);
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            department: formData.department,
            eventId: selectedEvent.id,
            tickets,
            otpVerificationId
          })
        });
        const savedBooking = await response.json();

        if (!response.ok) {
          throw new Error(savedBooking.message || 'Unable to save booking');
        }

        setBookingSummary(savedBooking);
        setBookings((prevBookings) => [savedBooking, ...prevBookings]);
        setEvents((prevEvents) => prevEvents.map((event) => (
          event.id === savedBooking.eventId
            ? { ...event, availableTickets: savedBooking.availableTickets }
            : event
        )));
        setFormData({
          name: '',
          email: '',
          department: '',
          tickets: ''
        });
        setIsOtpVerified(false);
        setOtpVerificationId(null);
        setErrors({});
        refreshEvents();
        refreshBookings();
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          submit: error.message
        }));
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      department: '',
      tickets: ''
    });
    setErrors({});
    setBookingSummary(null);
    setIsOtpVerified(false);
    setOtpVerificationId(null);
    refreshEvents();
  };

  const handleEventChange = (eventId) => {
    setSelectedEventId(eventId);
    setFormData((prevFormData) => ({ ...prevFormData, tickets: '' }));
    setBookingSummary(null);
    setErrors({});
  };

  return (
    <div className="App">
      <h1>Ticket Booking for Department Events</h1>
      <div className="browse-events">
        <div>
          <h2>Browse Events</h2>
          <p>{isLoadingEvents ? 'Refreshing live ticket counts...' : 'Choose an event and book from the live availability.'}</p>
        </div>
        <select
          aria-label="Browse events"
          onChange={(e) => handleEventChange(e.target.value)}
          value={selectedEvent.id}
        >
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} - {event.availableTickets} tickets left
            </option>
          ))}
        </select>
      </div>
      {errors.events && <p className="error">{errors.events}</p>}
      <div className="event-grid">
        {events.map((event) => (
          <button
            className={event.id === selectedEvent.id ? 'event-card active' : 'event-card'}
            key={event.id}
            onClick={() => handleEventChange(event.id)}
            type="button"
          >
            <span>{event.name}</span>
            <strong>{event.availableTickets}</strong>
            <small>tickets left</small>
          </button>
        ))}
      </div>
      <EventDetails event={selectedEvent} />
      <VenueMap event={selectedEvent} />
      <BookingForm
        formData={formData}
        setFormData={(nextFormData) => {
          if (nextFormData.email !== formData.email) {
            setIsOtpVerified(false);
            setOtpVerificationId(null);
            setErrors((prevErrors) => ({ ...prevErrors, otp: '' }));
          }
          setFormData(nextFormData);
        }}
        onSubmit={handleSubmit}
        errors={errors}
        onReset={handleReset}
        isOtpVerified={isOtpVerified}
        onOtpVerified={handleOtpVerified}
        event={selectedEvent}
      />
      <Chatbot event={selectedEvent} events={events} />

      {bookingSummary && (
        <div className="booking-confirmation">
          <h2>Latest Booking Confirmed!</h2>
          <p><strong>Name:</strong> {bookingSummary.name}</p>
          <p><strong>Email:</strong> {bookingSummary.email}</p>
          <p><strong>Department:</strong> {bookingSummary.department}</p>
          <p><strong>Event:</strong> {bookingSummary.eventName}</p>
          <p><strong>Tickets Booked:</strong> {bookingSummary.tickets}</p>
          <p><strong>Total Amount:</strong> Rs.{bookingSummary.totalAmount}</p>
          <p><strong>Tickets Still Available:</strong> {bookingSummary.availableTickets}</p>
          <p><strong>Booking Code:</strong> {bookingSummary.bookingCode}</p>
          <p><strong>Dispatched Tickets:</strong> #{bookingSummary.ticketStartNumber} to #{bookingSummary.ticketEndNumber}</p>
          <p><strong>OTP Verified ID:</strong> {bookingSummary.otpVerificationId}</p>
        </div>
      )}

      <div className="booking-confirmation booking-sheet">
        <div className="sheet-header">
          <div>
            <h2>All Ticket Bookings</h2>
            <p>{isLoadingBookings ? 'Loading booking sheet...' : `${bookings.length} booking records`}</p>
          </div>
          <button type="button" onClick={refreshBookings}>Refresh Sheet</button>
        </div>
        {errors.bookings && <p className="error">{errors.bookings}</p>}
        <div className="sheet-scroll">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Booking Code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Event</th>
                <th>Venue</th>
                <th>Ticket Price</th>
                <th>Tickets</th>
                <th>Total Amount</th>
                <th>Ticket Numbers</th>
                <th>Booked At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="12">No bookings saved yet.</td>
                </tr>
              )}
              {bookings.map((booking, index) => (
                <tr key={booking.id || booking.bookingCode}>
                  <td>{index + 1}</td>
                  <td>{booking.bookingCode}</td>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.department}</td>
                  <td>{booking.eventName}</td>
                  <td>{booking.venue}</td>
                  <td>Rs.{booking.ticketPrice || selectedEvent.price}</td>
                  <td>{booking.tickets}</td>
                  <td>Rs.{booking.totalAmount}</td>
                  <td>#{booking.ticketStartNumber} - #{booking.ticketEndNumber}</td>
                  <td>{booking.dispatchedAt ? new Date(booking.dispatchedAt).toLocaleString() : 'Just now'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
 
