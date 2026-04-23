import React from 'react';

const BookingForm = ({ formData, setFormData, onSubmit, errors, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="booking-form">
      <h2>Book Tickets</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          {errors.department && <span className="error">{errors.department}</span>}
        </div>
        <div>
          <label>Number of Tickets:</label>
          <input
            type="number"
            name="tickets"
            value={formData.tickets}
            onChange={handleChange}
            min="1"
            required
          />
          {errors.tickets && <span className="error">{errors.tickets}</span>}
        </div>
        <button type="submit">Book Tickets</button>
        <button type="button" onClick={onReset}>Reset</button>
      </form>
    </div>
  );
};

export default BookingForm;