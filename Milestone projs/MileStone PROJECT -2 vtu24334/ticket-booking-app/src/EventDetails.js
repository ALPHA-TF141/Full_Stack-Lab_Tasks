import React from 'react';

const EventDetails = ({ event }) => {
  return (
    <div className="event-details">
      <h2>Event Details</h2>
      <p><strong>Event Name:</strong> {event.name}</p>
      <p><strong>Department:</strong> {event.department}</p>
      <p><strong>Date & Time:</strong> {event.dateTime}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Ticket Price:</strong> ${event.price}</p>
      <p><strong>Available Tickets:</strong> {event.availableTickets}</p>
    </div>
  );
};

export default EventDetails;