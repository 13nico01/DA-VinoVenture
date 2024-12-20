import React, { useState, useEffect } from "react";
import NavBar from "../components/MainComponents/Navbar";
import HomeHero from "../components/HomeComponents/HomeHero";
import HomeAdmin from "../components/HomeComponents/HomeAdmin";
import Footer from "../components/MainComponents/Footer"

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <NavBar />
      {isLoggedIn ? <HomeAdmin /> : <HomeHero />}
      <Footer/>
    </>
  );
}

export default Home;
