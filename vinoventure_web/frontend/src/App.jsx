import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoginChecked, setIsLoginChecked] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isAdminLoggedIn") === "true";
    console.log("Login Status:", loggedInStatus); // Debug-Ausgabe
    setIsAdminLoggedIn(loggedInStatus);
    setIsLoginChecked(true);
  }, []);

  const handleLogin = (status) => {
    setIsAdminLoggedIn(status);
    localStorage.setItem("isAdminLoggedIn", status);
  };

  if (!isLoginChecked) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/admin" element={<AdminLogin onLogin={handleLogin} />} />

        {/* Protected Route */}
        <Route
          path="/admin-dashboard"
          element={
            isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin" />
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Catch all unmatched routes */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
