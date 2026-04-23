import mysql from "mysql2/promise";
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "inventiotrack",
});
export default db;
