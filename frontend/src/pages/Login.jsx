import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await fetch(
        `${API_BASE}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );

      const data = await response.json();

      console.log("FULL LOGIN RESPONSE:", data);

      // stop if login failed
      if (!response.ok) {
        alert(data.detail || "Invalid email or password");
        setLoading(false);
        return;
      }

      // only run if login succeeded
      console.log("Logged in role:", data.role);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("user_id", data.user_id);

      if (data.role === "admin") {
        navigate("/admin/companies");
      } else {
        navigate("/employee");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <h2>Sign in to Attendify</h2>
        <p>Continue managing attendance seamlessly.</p>

        <input
          type="email"
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

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="signup-link">
          Don't have an account?
          <span
            className="signup-bold"
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer" }}
          >
            {" "}Sign up
          </span>
        </p>

      </div>
    </div>
  );
}