import React, { useEffect, useState } from "react";
import axios from "axios";

import Filter from "../components/Filter";
import Sort from "../components/Sort";
import Table from "../components/Table";

import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState([]);
  const [department, setDepartment] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    let url = "http://localhost:5000/api/students?";

    if (department) url += `department=${department}&`;
    if (sortType) url += `sort=${sortType}`;

    axios.get(url).then((res) => setData(res.data));
  }, [department, sortType]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/students/count")
      .then((res) => setCounts(res.data));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Student Dashboard</h2>

      <div className="controls">
        <Filter setDepartment={setDepartment} />
        <Sort setSortType={setSortType} />
      </div>

      <Table data={data} />

      <div className="count-box">
        <h3>Department Count</h3>
        {counts.map((item) => (
          <p key={item.department}>
            {item.department}: {item.count}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;