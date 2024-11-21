import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminLoginHero({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  error,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    let logoutTimer;

    const resetTimer = () => {
      console.log("Timer wird zurückgesetzt"); // Konsolenausgabe für Debugging
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        console.log("Logout wird nach 1 Minute ausgeführt"); // Konsolenausgabe, bevor Logout erfolgt
        handleLogout(); // Automatisches Logout nach 1 Minute Inaktivität
      }, 60000); // 1 Minute (60000 Millisekunden)
    };

    // Timer bei jeder Benutzerinteraktion zurücksetzen
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer(); // Starte den Timer

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  useEffect(() => {
    const sessionCheckInterval = setInterval(() => {
      fetch("/api/session-check", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 401) {
            handleLogout(); // Session abgelaufen, Benutzer ausloggen
          }
        })
        .catch((error) => {
          console.error("Fehler beim Überprüfen der Session:", error);
        });
    }, 1000); // Überprüfe alle 30 Sekunden

    return () => clearInterval(sessionCheckInterval); // Stoppe das Intervall, wenn die Komponente entladen wird
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-black shadow-md rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border border-gray-300 p-2 rounded w-full mb-4 text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-gray-300 p-2 rounded w-full mb-4 text-white"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-green-600 to-green-900 hover-bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLoginHero;
