import mysql from "mysql2/promise";
export const db = mysql.createPool({
    host: "localhost", // ✅ Correct
    user: "root", // Your MySQL username
    password: "root", // 🔴 Must match MySQL password
    database: "inventiotrack",
    port: 3306 // Optional but safe
});
