const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dashboard1",
});

module.exports = db.promise();