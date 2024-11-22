import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import { CartProvider } from "./components/ShopComponents/CartContext";
import Cart from "./pages/Cart";

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
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLogin onLogin={handleLogin} />} />

          {/* Protected*/}
          <Route
            path="/admin-dashboard"
            element={
              isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin" />
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/*unmatched routes */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
