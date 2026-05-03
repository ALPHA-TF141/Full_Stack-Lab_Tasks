CREATE DATABASE IF NOT EXISTS ticket_booking_db;
USE ticket_booking_db;

CREATE TABLE IF NOT EXISTS otp_verifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_code VARCHAR(30) NOT NULL UNIQUE,
  otp_verification_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  department VARCHAR(100) NOT NULL,
  event_name VARCHAR(150) NOT NULL,
  venue VARCHAR(150) NOT NULL,
  ticket_price DECIMAL(10, 2) NOT NULL,
  tickets INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  ticket_start_number INT NOT NULL,
  ticket_end_number INT NOT NULL,
  dispatched_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (otp_verification_id) REFERENCES otp_verifications(id)
);

CREATE OR REPLACE VIEW last_ticket_dispatched AS
SELECT
  id,
  booking_code,
  name,
  email,
  event_name,
  tickets,
  ticket_start_number,
  ticket_end_number,
  dispatched_at
FROM bookings
ORDER BY dispatched_at DESC, id DESC
LIMIT 1;

SELECT * FROM ticket_booking_db.bookings;

SELECT * FROM ticket_booking_db.otp_verifications;

SELECT * FROM ticket_booking_db.last_ticket_dispatched;