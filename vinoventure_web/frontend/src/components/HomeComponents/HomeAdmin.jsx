import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundHero from "../../assets/Images/image21.jpg";

function HomeAdmin() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Für die Navigation verwenden

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Möchten Sie sich wirklich ausloggen?"
    );
    if (confirmLogout) {
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("username");

      navigate("/home"); // Weiterleitung zur /home Seite
      window.location.reload(); // Seite neu laden
    }
  };

  return (
    <div className="relative">
      <div
        className="bg-cover bg-center w-full h-dvh fixed top-0 left-0 brightness-50"
        style={{
          backgroundImage: `url(${backgroundHero})`,
        }}
      ></div>

      <div className="relative px-2 z-10 mx-auto max-w-6xl py-40 sm:py-40 md:py-50 lg:py-50">
        <div className="text-center">
          <h1 className="text-white font-bold tracking-tight text-5xl md:text-7xl lg:text-8xl">
            Willkommen{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-800 text-transparent bg-clip-text">
              {username}
            </span>
          </h1>
          <p
            className="mt-6 text-white"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.5rem)", // Dynamische Anpassung der Fontgröße
              lineHeight: "1.5",
            }}
          >
            Admin Welcome Seite
            <br />
            Wähle deine Aktion aus:{" "}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/admin-dashboard"
              className="rounded-md bg-gradient-to-r from-green-600 to-green-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Admin-Panel
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold leading-6 text-white"
              href="/"
            >
              Log out <span aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
