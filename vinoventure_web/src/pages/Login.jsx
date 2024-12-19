import React from "react";
import Navbar from "../components/MainComponents/Navbar";
import LoginComponent from "../components/LoginRegisterComponents/LoginComponent";

function Login() {
  return (
    <div>
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Navbar />
      <LoginComponent />
    </div>
  );
}

export default Login;
