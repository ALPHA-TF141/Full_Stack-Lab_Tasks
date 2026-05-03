import React, { useCallback, useState } from 'react';
import './App.css';
import EventDetails from './EventDetails';
import BookingForm from './BookingForm';
import VenueMap from './VenueMap';
import Chatbot from './Chatbot';

function App() {
  const [event] = useState({
    name: 'Tech Fest 2023',
    department: 'Computer Science Engineering',
    dateTime: 'October 15, 2023, 10:00 AM',
    venue: 'Veltech University Auditorium',
    price: 100,
    availableTickets: 50,
    mapLabel: 'Veltech University, ORR Service Road, Morai, Ambattur, Tamil Nadu',
    mapUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=80.09697318077089%2C13.176126182014016%2C80.10109305381776%2C13.17788900370179&layer=mapnik&marker=13.176435%2C80.097713',
    mapLink: 'https://www.openstreetmap.org/search?query=Veltech+University%2C+ORR+Service+Road%2C+Morai%2C+Ambattur%2C+%E0%AE%A4%E0%AE%BF%E0%AE%B0%E0%AF%81%E0%AE%B5%E0%AE%B3%E0%AF%8D%E0%AE%B3%E0%AF%82%E0%AE%B0%E0%AF%8D+%E0%AE%AE%E0%AE%BE%E0%AE%B5%E0%AE%9F%E0%AF%8D%E0%AE%9F%E0%AE%AE%E0%AF%8D%2C+Tamil+Nadu%2C+600055%2C+India&zoom=19&minlon=80.09697318077089&minlat=13.176126182014016&maxlon=80.10109305381776&maxlat=13.17788900370179#map=17/13.176435/80.097713'
  });

  const [availableTickets, setAvailableTickets] = useState(event.availableTickets);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    tickets: ''
  });
  const [errors, setErrors] = useState({});
  const [bookingSummary, setBookingSummary] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpVerificationId, setOtpVerificationId] = useState(null);

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
    } else if (tickets > availableTickets) {
      newErrors.tickets = `Only ${availableTickets} tickets available`;
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
            eventName: event.name,
            venue: event.venue,
            ticketPrice: event.price,
            tickets,
            otpVerificationId
          })
        });
        const savedBooking = await response.json();

        if (!response.ok) {
          throw new Error(savedBooking.message || 'Unable to save booking');
        }

        setAvailableTickets(availableTickets - tickets);
        setBookingSummary(savedBooking);
        setBookingHistory((prevBookings) => [...prevBookings, savedBooking]);
        setFormData({
          name: '',
          email: '',
          department: '',
          tickets: ''
        });
        setIsOtpVerified(false);
        setOtpVerificationId(null);
        setErrors({});
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
    setBookingHistory([]);
    setAvailableTickets(event.availableTickets);
    setIsOtpVerified(false);
    setOtpVerificationId(null);
  };

  return (
    <div className="App">
      <h1>Ticket Booking for Internal Department Event</h1>
      <EventDetails event={{ ...event, availableTickets }} />
      <VenueMap event={event} />
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
      />
      <Chatbot event={{ ...event, availableTickets }} />

      {bookingSummary && (
        <div className="booking-confirmation">
          <h2>Latest Booking Confirmed!</h2>
          <p><strong>Name:</strong> {bookingSummary.name}</p>
          <p><strong>Email:</strong> {bookingSummary.email}</p>
          <p><strong>Department:</strong> {bookingSummary.department}</p>
          <p><strong>Event:</strong> {bookingSummary.eventName}</p>
          <p><strong>Tickets Booked:</strong> {bookingSummary.tickets}</p>
          <p><strong>Total Amount:</strong> Rs.{bookingSummary.totalAmount}</p>
          <p><strong>Booking Code:</strong> {bookingSummary.bookingCode}</p>
          <p><strong>Dispatched Tickets:</strong> #{bookingSummary.ticketStartNumber} to #{bookingSummary.ticketEndNumber}</p>
          <p><strong>OTP Verified ID:</strong> {bookingSummary.otpVerificationId}</p>
        </div>
      )}

      {bookingHistory.length > 0 && (
        <div className="booking-confirmation">
          <h2>All Ticket Bookings</h2>
          {bookingHistory.map((booking, index) => (
            <div key={index}>
              <p><strong>Booking #{index + 1}</strong></p>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Department:</strong> {booking.department}</p>
              <p><strong>Event:</strong> {booking.eventName}</p>
              <p><strong>Tickets Booked:</strong> {booking.tickets}</p>
              <p><strong>Total Amount:</strong> Rs.{booking.totalAmount}</p>
              <p><strong>Booking Code:</strong> {booking.bookingCode}</p>
              <p><strong>Dispatched Tickets:</strong> #{booking.ticketStartNumber} to #{booking.ticketEndNumber}</p>
              <p><strong>OTP Verified ID:</strong> {booking.otpVerificationId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
 
