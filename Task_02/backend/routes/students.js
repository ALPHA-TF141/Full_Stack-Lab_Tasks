const express = require("express");
const router = express.Router();

const {
  getStudents,
  getDepartmentCount,
} = require("../controllers/studentController");

router.get("/", getStudents);
router.get("/count", getDepartmentCount);

module.exports = router;