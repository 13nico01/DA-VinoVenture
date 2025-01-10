import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/MainComponents/Navbar";
import API_BASE_URL from "../constants/constants";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
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
        navigate("/admin-dashboard"); 
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while logging in.");
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="relative">
      <Navbar />

      <div className="flex justify-center items-center min-h-screen text-white px-4">
        <div className="w-full max-w-md p-10 space-y-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-green-600">
            Admin Login
          </h2>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Benutzername
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Benutzername"
                onKeyPress={handleKey}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Passwort
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Passwort"
                  onKeyPress={handleKey}
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-green-500"
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              onClick={handleLogin}
              type="button"
              className="w-full py-3 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Einloggen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
