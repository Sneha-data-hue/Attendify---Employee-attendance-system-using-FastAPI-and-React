import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateCompany from "./pages/CreateCompany";
import Landing from "./pages/Landing";
import EmployeeDashboard from "./pages/EmployeeDashboard";

import AdminLayout from "./layouts/AdminLayout";

import Companies from "./pages/Companies";
import CompanyDashboard from "./pages/CompanyDashboard";
import Reports from "./pages/Reports";
import Invite from "./pages/Invite";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-company" element={<CreateCompany />} />
        <Route path="/employee" element={<EmployeeDashboard />} />

        {/* ✅ Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route path="companies" element={<Companies />} />
          <Route path="companydashboard" element={<CompanyDashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="invite" element={<Invite />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;