import Navbar from "../components/MainComponents/Navbar";
import { useState } from "react";
import AdminLoginHero from "../components/HomeComponents/AdminLoginHero";
import { useNavigate } from "react-router-dom";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Verwende useNavigate anstelle von Navigate
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        onLogin(true);
        localStorage.setItem("isAdminLoggedIn", true);
        localStorage.setItem("username", username);
        navigate("/admin-dashboard"); // Verwende navigate anstelle von Navigate()
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <>
      <Navbar />
      <AdminLoginHero
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        error={error}
      />
    </>
  );
}

export default AdminLogin;
