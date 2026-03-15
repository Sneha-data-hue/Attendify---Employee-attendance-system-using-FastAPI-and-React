import { useState } from "react";
import axios from "axios";
import API_BASE from "../api";
import "../styles/admin.css";

export default function Invite() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");

  const token = localStorage.getItem("token");

  const sendInvite = async () => {
    try {

      console.log("Sending email:", email);

      const res = await axios.post(
        `${API_BASE}/api/v1/invite/send`,
        {
          email,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Invite sent successfully!");

    } catch (err) {
      console.log(err);
      alert("Error sending invite");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Invite Employee</h1>

      <input
        type="email"
        placeholder="Employee Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
        <option value="admin">Associate Admin</option>
        <option value="hr">H R</option>
        <option value="finance">Finance</option>
        <option value="backend_developer">Backend Developer</option>
        <option value="frontend_developer">Frontend Developer</option>
        <option value="system_operator">System Operator</option>
        <option value="software_engineer">Software Engineer</option>
        <option value="data_analyst">Data Analyst</option>
        <option value="business_analyst">Business Analyst</option>
      </select>

      <br /><br />

      <button className="primary" onClick={sendInvite}>
        <span>Send Invite</span>
      </button>
    </div>
  );
}