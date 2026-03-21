import React from "react";
import "./Sort.css";

const Sort = ({ setSortType }) => {
  return (
    <select onChange={(e) => setSortType(e.target.value)}>
      <option value="">Sort By</option>
      <option value="name">Name</option>
      <option value="date">Date</option>
    </select>
  );
};

export default Sort;