CREATE DATABASE studentdb;

USE studentdb;

CREATE TABLE students (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100),
dob DATE,
department VARCHAR(50),
phone VARCHAR(15)
);

SELECT * FROM studentdb.students;