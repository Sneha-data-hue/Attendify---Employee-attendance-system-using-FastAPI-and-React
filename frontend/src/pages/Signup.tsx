import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import API_BASE from "../api";
import "./Signup.css";

export default function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tokenData, setTokenData] = useState(null);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  // Verify invite token
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API_BASE}/api/v1/invite/verify/${token}`)
      .then((res) => {
        setTokenData(res.data);
        setEmail(res.data.email);
      })
      .catch(() => {
        alert("Invalid invite link");
      });

  }, [token]);

  // Register user
  const handleSignup = async () => {

    try {

      const res = await axios.post(
        `${API_BASE}/api/v1/auth/register?token=${token}`,
        {
          username: name,
          email: email,
          password: password
        }
      );

      alert(res.data.message || "Account created successfully");

      navigate("/login");

    } catch (err) {

      console.error(err.response?.data);
      alert("Signup failed");

    }

  };

  return (

    <div className="signup-page">

      {/* LEFT SIDE */}
      <div className="signup-left">

        <div className="logo">
          <h1>Attendify</h1>
        </div>

        <p className="tagline">
          Smart Face Recognition Attendance System
        </p>

        <ul>
          <li>✔ Face Recognition Attendance</li>
          <li>✔ Company Dashboard</li>
          <li>✔ Real-time Reports</li>
        </ul>

      </div>


      {/* RIGHT SIDE */}
      <div className="signup-right">

        <h2>Create Account</h2>
        <p className="sub">Get started with your free account</p>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          disabled={tokenData !== null}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Invited role */}
        {tokenData && (
          <p style={{ marginBottom: "10px", color: "#aaa" }}>
            Invited as <b>{tokenData.role}</b>
          </p>
        )}

        <button className="create-btn" onClick={handleSignup}>
          Create Account
        </button>

        <p className="signin-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>

      </div>

    </div>
  );
}