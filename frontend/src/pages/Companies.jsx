import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../api";
import "../styles/admin.css";

export default function Companies() {

  const [company, setCompany] = useState(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");

  // Get My Company
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API_BASE}/api/v1/companies/my-company`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCompany(res.data))
      .catch(() => setCompany(null));

  }, [token]);

  // Create Company
  const handleCreate = async () => {

    if (!name || !address || !phone || !companyType || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await axios.post(
        `${API_BASE}/api/v1/companies/`,
        {
          name,
          email,
          address,
          phone,
          company_type: companyType,
          password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCompany(res.data);
      alert("Company Created Successfully");

    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error creating company");
    }

  };

  return (
    <div>

      <h1>Companies</h1>

      <div className="card">

        {company ? (

          <div>
            <h3>Your Company</h3>

            <p><b>Name:</b> {company.name}</p>
            <p><b>ID:</b> {company.id}</p>

          </div>

        ) : (

          <div>

            <h3>Create Company</h3>

            <input
              placeholder="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <select
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
            >
              <option value="">Select Company Type</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Construction">Construction</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>

            <button className="primary" onClick={handleCreate}>
              Create Company
            </button>

          </div>

        )}

      </div>

    </div>
  );
}