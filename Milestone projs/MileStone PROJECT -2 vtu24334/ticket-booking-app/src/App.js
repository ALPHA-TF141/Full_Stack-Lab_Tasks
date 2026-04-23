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
      setBookingSummary({
        name: formData.name,
        eventName: event.name,
        tickets: tickets,
        totalAmount: totalAmount
      });
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
  };

  return (
    <div className="App">
      <h1>Ticket Booking for Internal Department Event</h1>
      <EventDetails event={{ ...event, availableTickets }} />
      {!bookingSummary ? (
        <BookingForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          errors={errors}
          onReset={handleReset}
        />
      ) : (
        <div className="booking-confirmation">
          <h2>Booking Confirmed!</h2>
          <p><strong>Name:</strong> {bookingSummary.name}</p>
          <p><strong>Event:</strong> {bookingSummary.eventName}</p>
          <p><strong>Tickets Booked:</strong> {bookingSummary.tickets}</p>
          <p><strong>Total Amount:</strong> ${bookingSummary.totalAmount}</p>
          <button onClick={() => setBookingSummary(null)}>Book More Tickets</button>
        </div>
      )}
    </div>
  );
}

export default App;
