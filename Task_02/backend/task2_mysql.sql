CREATE DATABASE dashboard1;

USE dashboard1;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(50),
  date DATE
);

INSERT INTO students (name, department, date) VALUES
('Arun', 'IT', '2024-02-10'),
('Bala', 'HR', '2023-12-05'),
('Charan', 'Finance', '2024-01-15'),
('Divya', 'IT', '2023-11-20'),
('Aman', 'CSE', '2026-03-17'),
('Esha', 'HR', '2024-03-01');