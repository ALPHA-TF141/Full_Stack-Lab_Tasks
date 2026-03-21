const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ error: "All fields are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
        console.log(err);   // 🔥 SHOW REAL ERROR
        return res.json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.json({ error: "User not found" });
    }

    const user = result[0];

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.json({ error: "Invalid password" });
    }

    res.json({ message: "Login successful", user });
  });
};