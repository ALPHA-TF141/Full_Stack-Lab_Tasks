const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "fsTaskDb"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});


// GET all accounts
app.get("/accounts", (req, res) => {
    db.query("SELECT * FROM Accounts", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


// CREATE account
app.post("/accounts", (req, res) => {
    const { name, email, balance } = req.body;

    const sql = "INSERT INTO Accounts (name, email, balance) VALUES (?, ?, ?)";
    db.query(sql, [name, email, balance], (err, result) => {
        if (err) throw err;
        res.send("Account Created");
    });
});


// UPDATE account
app.put("/accounts/:id", (req, res) => {
    const { name, email, balance } = req.body;

    const sql = "UPDATE Accounts SET name=?, email=?, balance=? WHERE id=?";
    db.query(sql, [name, email, balance, req.params.id], (err, result) => {
        if (err) throw err;
        res.send("Account Updated");
    });
});


// GET logs
app.get("/logs", (req, res) => {
    db.query("SELECT * FROM Account_Log ORDER BY action_time DESC LIMIT 100", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


// GET daily report
app.get("/daily-report", (req, res) => {
    db.query("SELECT * FROM Daily_Activity_Report", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


// GET account summary
app.get("/account-summary", (req, res) => {
    db.query("SELECT * FROM Account_Activity_Summary", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});