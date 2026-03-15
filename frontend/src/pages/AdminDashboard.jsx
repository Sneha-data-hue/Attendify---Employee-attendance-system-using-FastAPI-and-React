import { useNavigate } from "react-router-dom";
import API_BASE from "../api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleNavigate = async (endpoint, route, checkCompany = false) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // If company check required and company not found
      if (checkCompany && response.status === 404) {
        navigate("/create-company");
        return;
      }

      // If request failed
      if (!response.ok) {
        let errorMessage = "Something went wrong.";

        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // ignore json parsing error
        }

        console.error("Backend error:", errorMessage);
        alert(errorMessage);
        return;
      }

      // Navigate to route
      navigate(route);

    } catch (error) {
      console.error("Error:", error);
      alert("Backend not responding.");
    }
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2>Attendify</h2>

        <button
          onClick={() =>
            handleNavigate(
              "/api/v1/companies/my-company",
              "/companies",
              true
            )
          }
        >
          Companies
        </button>

        <button
          onClick={() =>
            handleNavigate(
              "/api/v1/dashboard/employees",
              "/companydashboard"
            )
          }
        >
          Company Dashboard
        </button>

        <button onClick={() => navigate("/reports")}>
          Reports
        </button>

        <button onClick={() => navigate("/invite")}>
          Invite Employees
        </button>
      </div>

      <div className="admin-main">
        <h1>Welcome Admin</h1>
        <p>Select a module from the sidebar.</p>
      </div>
    </div>
  );
}