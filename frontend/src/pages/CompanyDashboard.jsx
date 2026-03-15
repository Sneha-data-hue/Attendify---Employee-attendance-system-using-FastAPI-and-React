import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../api";
import "../styles/admin.css";

export default function CompanyDashboard() {

  const [data, setData] = useState({
    total_employees: 0,
    present_today: 0,
    absent_today: 0,
    late_today: 0,
  });

  const [selected, setSelected] = useState(null);
  const [list, setList] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        const employees = await axios.get(
          `${API_BASE}/api/v1/dashboard/employees`,
          { headers }
        );

        const present = await axios.get(
          `${API_BASE}/api/v1/dashboard/present`,
          { headers }
        );

        const absent = await axios.get(
          `${API_BASE}/api/v1/dashboard/absent`,
          { headers }
        );

        const late = await axios.get(
          `${API_BASE}/api/v1/dashboard/late`,
          { headers }
        );

        setData({
          total_employees: employees.data.length,
          present_today: present.data.length,
          absent_today: absent.data.length,
          late_today: late.data.length,
        });

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const fetchDetails = async (type) => {

    const headers = { Authorization: `Bearer ${token}` };

    let url = "";

    if (type === "employees")
      url = `${API_BASE}/api/v1/dashboard/employees`;

    if (type === "present")
      url = `${API_BASE}/api/v1/dashboard/present`;

    if (type === "absent")
      url = `${API_BASE}/api/v1/dashboard/absent`;

    if (type === "late")
      url = `${API_BASE}/api/v1/dashboard/late`;

    try {
      const res = await axios.get(url, { headers });
      setSelected(type);
      setList(res.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="dashboard-container">
      <h1>Company Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card" onClick={() => fetchDetails("employees")}>
          <h3>Total Employees</h3>
          <p>{data.total_employees}</p>
        </div>

        <div className="card present" onClick={() => fetchDetails("present")}>
          <h3>Present Today</h3>
          <p>{data.present_today}</p>
        </div>

        <div className="card absent" onClick={() => fetchDetails("absent")}>
          <h3>Absent Today</h3>
          <p>{data.absent_today}</p>
        </div>

        <div className="card late" onClick={() => fetchDetails("late")}>
          <h3>Late Employees</h3>
          <p>{data.late_today}</p>
        </div>

      </div>


      {selected && (
        <div className="employee-table">

          <h2 style={{ marginTop: "40px" }}>
            {selected.toUpperCase()} EMPLOYEES
          </h2>

          <table>

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {list.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.username}</td>
                  <td>{emp.email}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}