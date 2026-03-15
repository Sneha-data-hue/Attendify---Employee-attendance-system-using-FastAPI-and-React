import { Outlet, useNavigate } from "react-router-dom";
import "../styles/admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="admin-layout">

      <div className="admin-sidebar">
        <h2>Attendify</h2>

        <button onClick={() => navigate("/admin/companies")}>
          Companies
        </button>

        <button onClick={() => navigate("/admin/companydashboard")}>
          Company Dashboard
        </button>

        <button onClick={() => navigate("/admin/reports")}>
          Reports
        </button>

        <button onClick={() => navigate("/admin/invite")}>
          Invite Employees
        </button>
      </div>

      <div className="admin-main">
        <Outlet />
      </div>

    </div>
  );
}