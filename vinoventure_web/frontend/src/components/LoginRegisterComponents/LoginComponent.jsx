import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Einfache Validierung
    if (username === "" || password === "") {
      setError("Username and Password are required");
      return;
    }

    try {
      // Beispiel-API-Aufruf zur Authentifizierung (ersetze durch deinen tatsächlichen API-Endpunkt)
      const response = await fetch(
        "http://localhost:3000/api/user-login/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // JWT und Benutzernamen im Local Storage speichern
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username); // Speichere den Benutzernamen

        navigate("/home"); // Bei Erfolg auf eine andere Seite weiterleiten (z. B. das Dashboard)
      } else {
        // Bei fehlgeschlagenem Login eine Fehlermeldung setzen
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-black shadow-md rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border border-gray-300 p-2 rounded w-full mb-4 text-white bg-gray-800"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-gray-300 p-2 rounded w-full mb-4 text-white bg-gray-800"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-green-600 to-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginComponent;
