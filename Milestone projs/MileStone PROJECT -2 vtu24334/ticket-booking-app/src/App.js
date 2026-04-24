import React, { useState } from 'react';
import './App.css';
import EventDetails from './EventDetails';
import BookingForm from './BookingForm';

function App() {
  const [event] = useState({
    name: 'Tech Fest 2023',
    department: 'Computer Science Engineering',
    dateTime: 'October 15, 2023, 10:00 AM',
    venue: 'Main Auditorium',
    price: 100,
    availableTickets: 50
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const tickets = parseInt(formData.tickets);
      const totalAmount = tickets * event.price;
      setAvailableTickets(availableTickets - tickets);
      const newBooking = {
        name: formData.name,
        email: formData.email,
        department: formData.department,
        eventName: event.name,
        tickets: tickets,
        totalAmount: totalAmount
      };
      setBookingSummary(newBooking);
      setBookingHistory((prevBookings) => [...prevBookings, newBooking]);
      // Reset form
      setFormData({
        name: '',
        email: '',
        department: '',
        tickets: ''
      });
      setErrors({});
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
  };

  return (
    <div className="App">
      <h1>Ticket Booking for Internal Department Event</h1>
      <EventDetails event={{ ...event, availableTickets }} />
      <BookingForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        errors={errors}
        onReset={handleReset}
      />

      {bookingSummary && (
        <div className="booking-confirmation">
          <h2>Latest Booking Confirmed!</h2>
          <p><strong>Name:</strong> {bookingSummary.name}</p>
          <p><strong>Email:</strong> {bookingSummary.email}</p>
          <p><strong>Department:</strong> {bookingSummary.department}</p>
          <p><strong>Event:</strong> {bookingSummary.eventName}</p>
          <p><strong>Tickets Booked:</strong> {bookingSummary.tickets}</p>
          <p><strong>Total Amount:</strong> Rs.{bookingSummary.totalAmount}</p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
