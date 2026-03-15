import { useState } from "react";
import axios from "axios";
import API_BASE from "../api";
import "../styles/admin.css";

export default function Reports() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [report, setReport] = useState([]);
  const token = localStorage.getItem("token");

  const getReport = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/v1/reports/monthly?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReport(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching report");
    }
  };

  const exportReport = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/v1/reports/monthly/export?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "monthly_report.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
      alert("Export failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Monthly Reports</h1>

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <input
        type="number"
        placeholder="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <br /><br />

      <button className="primary" onClick={getReport}>
        <span>Get Monthly Report</span>
      </button>

      <button className="primary" onClick={exportReport}>
        <span>Export Excel</span>
      </button>

      <br /><br />

      {report.length > 0 && (
        <table
          style={{
            marginTop: "30px",
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th>Name</th>
              <th>Working Days</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Late</th>
              <th>Total Hours</th>
            </tr>
          </thead>

          <tbody>
            {report.map((emp) => (
              <tr key={emp.employee_id} style={{ textAlign: "center" }}>
                <td>{emp.employee_name}</td>
                <td>{emp.total_working_days}</td>
                <td>{emp.present_days}</td>
                <td>{emp.absent_days}</td>
                <td>{emp.late_days}</td>
                <td>{emp.total_work_hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}