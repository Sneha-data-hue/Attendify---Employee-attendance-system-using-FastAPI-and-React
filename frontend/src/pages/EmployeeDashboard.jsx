import { useEffect, useState, useRef } from "react";
import axios from "axios";
import API_BASE from "../api";
import "../pages/EmployeeDashboard.css";
import Webcam from "react-webcam";

export default function EmployeeDashboard() {

  const token = localStorage.getItem("token");

  const [history, setHistory] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraAction, setCameraAction] = useState("");
  const [faceRegistered, setFaceRegistered] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const webcamRef = useRef(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/v1/attendance/my-history`,
        { headers }
      );
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const openRegisterCamera = () => {
    setCameraAction("register");
    setShowCamera(true);
  };

  const openVerifyCamera = () => {
    setCameraAction("verify");
    setShowCamera(true);
  };

  const capture = async () => {

    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) {
      alert("Camera not ready");
      return;
    }

    try {

      const blob = await fetch(imageSrc).then(res => res.blob());

      const formData = new FormData();
      formData.append("file", blob, "face.jpg");

      if (cameraAction === "register") {

        await axios.post(
          `${API_BASE}/api/v1/face/register`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        alert("Face Registered Successfully");
        setFaceRegistered(true);
      }

      if (cameraAction === "verify") {

        await axios.post(
          `${API_BASE}/api/v1/face/verify`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        alert("Face Verified Successfully");
      }

      setShowCamera(false);

    } catch (error) {

      console.log(error.response?.data);
      alert(error.response?.data?.detail || "Face operation failed");

    }
  };

  const handleCheckIn = async () => {
    try {

      await axios.post(
        `${API_BASE}/api/v1/attendance/check-in`,
        null,
        { headers }
      );

      alert("Checked In");
      fetchHistory();

    } catch (error) {
      alert(error.response?.data?.detail);
    }
  };

  const handleCheckOut = async () => {
    try {

      await axios.post(
        `${API_BASE}/api/v1/attendance/check-out`,
        null,
        { headers }
      );

      alert("Checked Out");
      fetchHistory();

    } catch (error) {
      alert(error.response?.data?.detail);
    }
  };

  const applyLeave = async () => {

    if (!startDate || !endDate || !reason) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        `${API_BASE}/api/v1/leave/apply`,
        {
          start_date: startDate,
          end_date: endDate,
          reason: reason
        },
        { headers }
      );

      alert("Leave Applied Successfully");

      setStartDate("");
      setEndDate("");
      setReason("");

    } catch (error) {
      alert(error.response?.data?.detail);
    }
  };

  return (

    <div className="employee-dashboard">

      <h1>Welcome to Employee Dashboard</h1>

      <div className="face-section">

        <h2>Face Recognition</h2>

        {!faceRegistered && (
          <button className="face-btn" onClick={openRegisterCamera}>
            Register Face
          </button>
        )}

        <button className="face-btn verify" onClick={openVerifyCamera}>
          Verify Face
        </button>

      </div>

      {showCamera && (

        <div className="camera-box">

          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
          />

          <div className="camera-buttons">

            <button onClick={capture}>Capture</button>

            <button onClick={() => setShowCamera(false)}>
              Cancel
            </button>

          </div>

        </div>

      )}

      <div className="buttons">

        <button className="checkin" onClick={handleCheckIn}>
          Check In
        </button>

        <button className="checkout" onClick={handleCheckOut}>
          Check Out
        </button>

      </div>

      <div className="leave-form">

        <h2>Apply Leave</h2>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button className="leave" onClick={applyLeave}>
          Submit Leave
        </button>

      </div>

      <div className="history">

        <h2>My Attendance History</h2>

        <table>

          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
            </tr>
          </thead>

          <tbody>

            {history.map((item) => {

              const date = new Date(item.check_in);

              return (
                <tr key={item.id}>
                  <td>{date.toLocaleDateString()}</td>
                  <td>{new Date(item.check_in).toLocaleTimeString()}</td>
                  <td>
                    {item.check_out
                      ? new Date(item.check_out).toLocaleTimeString()
                      : "--"}
                  </td>
                </tr>
              );

            })}

          </tbody>

        </table>

      </div>

    </div>

  );
}