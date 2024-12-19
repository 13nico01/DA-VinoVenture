import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import API_BASE_URL from "../../constants/constants";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setError("Username and Password are required");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/user-login/login`,
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);

        if (data.user_id) {
          localStorage.setItem("userID", data.user_id);
        } else {
          console.error("user_id fehlt in der Antwort");
        }
        window.location.reload();
        navigate("/");
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred while logging in. Please try again.");
    }
  };

  addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      handleLogin();
    }
  });

  const showPswd = () => {
    var x = document.getElementById("passwordInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-neutral-200 shadow-md rounded-lg px-16 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border border-gray-300 p-2 rounded-xl w-full mb-4 text-white bg-gray-800"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          id="passwordInput"
          className="border border-gray-300 p-2 rounded-xl w-full mb-4 text-white bg-gray-800"
        />
        <div className="">
          <input
            onClick={showPswd}
            type="checkbox"
            className=" mb-4 text-white"
          />
        </div>

        {error && <p className="text-red-500 mb-3 font-normal">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-1/2 bg-gradient-to-r from-green-600 to-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-2xl"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginComponent;
