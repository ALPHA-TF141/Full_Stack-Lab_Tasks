CREATE DATABASE fsTaskDb;
USE fsTaskDb;

CREATE TABLE Accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    balance DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Account_Log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT,
    operation_type VARCHAR(20),
    old_name VARCHAR(100),
    old_email VARCHAR(100),
    old_balance DECIMAL(10,2),
    new_name VARCHAR(100),
    new_email VARCHAR(100),
    new_balance DECIMAL(10,2),
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER $$

CREATE TRIGGER account_insert_log
AFTER INSERT ON Accounts
FOR EACH ROW
BEGIN
    INSERT INTO Account_Log (account_id, operation_type, new_name, new_email, new_balance)
    VALUES (NEW.id, 'INSERT', NEW.name, NEW.email, NEW.balance);
END$$

CREATE TRIGGER account_update_log
AFTER UPDATE ON Accounts
FOR EACH ROW
BEGIN
    INSERT INTO Account_Log (
        account_id, operation_type,
        old_name, old_email, old_balance,
        new_name, new_email, new_balance
    )
    VALUES (
        NEW.id, 'UPDATE',
        OLD.name, OLD.email, OLD.balance,
        NEW.name, NEW.email, NEW.balance
    );
END$$

DELIMITER ;

CREATE VIEW Daily_Activity_Report AS
SELECT DATE(action_time) AS Activity_Date,
       operation_type,
       COUNT(*) AS Total_Operations
FROM Account_Log
GROUP BY DATE(action_time), operation_type;

CREATE VIEW Account_Activity_Summary AS
SELECT a.id, a.name,
       COUNT(l.log_id) AS Total_Changes
FROM Accounts a
LEFT JOIN Account_Log l ON a.id = l.account_id
GROUP BY a.id, a.name;