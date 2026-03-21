import React from "react";
import "./Filter.css";

const Filter = ({ setDepartment }) => {
  return (
    <select onChange={(e) => setDepartment(e.target.value)}>
      <option value="">All Departments</option>
      <option value="IT">IT</option>
      <option value="HR">HR</option>
      <option value="Finance">Finance</option>
      <option value="CSE">CSE</option>
    </select>
  );
};

export default Filter;