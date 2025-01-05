import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import API_BASE_URL from "../../constants/constants";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setError("Benutzername und Passwort sind erforderlich.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("username", username);

        if (data.user_id) {
          localStorage.setItem("userID", data.user_id);
        } else {
          console.error("user_id fehlt in der Antwort");
        }
        navigate("/");
      } else {
        setError(data.message || "Ungültiger Benutzername oder Passwort.");
      }
    } catch (error) {
      setError(
        "Beim Einloggen ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
      );
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Willkommen zurück
        </h2>
        <p className="text-gray-400 mb-8 text-center">
          Bitte melden Sie sich mit Ihrem Konto an
        </p>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Benutzername
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Geben Sie Ihren Benutzernamen ein"
              className="w-full border border-gray-600 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Passwort
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Geben Sie Ihr Passwort ein"
              className="w-full border border-gray-600 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyPress={handleKeyPress}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-green-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
          >
            Einloggen
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Noch kein Konto?{" "}
            <Link
              to="/register"
              className="text-green-500 hover:text-green-400 font-medium"
            >
              Registrieren
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
