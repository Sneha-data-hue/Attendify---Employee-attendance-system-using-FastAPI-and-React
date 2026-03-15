import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";
import "./CreateCompany.css";

export default function CreateCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    company_type: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_BASE}/api/v1/companies/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend error:", data);
        alert(data.detail || "Error creating company");
        return;
      }

      alert("Company created successfully!");
      navigate("/companies");

    } catch (error) {
      console.error("Request failed:", error);
      alert("Server connection error");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Create Your Company</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Company Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="address"
          placeholder="Company Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="company_type"
          placeholder="Company Type (IT, Finance, etc)"
          value={formData.company_type}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Create Company</button>

      </form>
    </div>
  );
}