const db = require("../config/db");

// GET students (filter + sort)
exports.getStudents = async (req, res) => {
  try {
    const { department, sort } = req.query;

    let query = "SELECT * FROM students";
    let values = [];

    if (department) {
      query += " WHERE department = ?";
      values.push(department);
    }

    if (sort === "name") {
      query += " ORDER BY name ASC";
    } else if (sort === "date") {
      query += " ORDER BY date ASC";
    }

    const [rows] = await db.query(query, values);
    res.json(rows);

  } catch (err) {
    res.status(500).json(err);
  }
};

// GET department count
exports.getDepartmentCount = async (req, res) => {
  try {
    const query = `
      SELECT department, COUNT(*) AS count
      FROM students
      GROUP BY department
    `;

    const [rows] = await db.query(query);
    res.json(rows);

  } catch (err) {
    res.status(500).json(err);
  }
};