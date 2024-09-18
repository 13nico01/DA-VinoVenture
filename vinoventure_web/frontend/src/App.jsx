import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import NoPage from "./pages/NoPage.jsx";
import About from "./pages/About.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const App = () => {
  // State to manage login status
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check login status from localStorage (for persistent login)
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isAdminLoggedIn") === "true";
    setIsAdminLoggedIn(loggedInStatus);
  }, []);

  // Function to handle login (you could pass this to the AdminLogin component)
  const handleLogin = (status) => {
    setIsAdminLoggedIn(status);
    localStorage.setItem("isAdminLoggedIn", status);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminLogin onLogin={handleLogin} />} />
          
          {/* Protected Route */}
          <Route
            path="/admin-dashboard"
            element={
              isAdminLoggedIn ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/admin" />
              )
            }
          />

          {/* Catch all unmatched routes */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
