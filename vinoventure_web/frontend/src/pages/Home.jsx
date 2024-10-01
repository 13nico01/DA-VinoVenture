import React, { useState, useEffect } from "react";
import NavBar from "../components/MainComponents/Navbar";
import HomeHero from "../components/HomeComponents/HomeHero";
import HomeAdmin from "../components/HomeComponents/HomeAdmin";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Überprüfe Anmeldestatus beim Laden der Komponente
    const loggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <NavBar />
      {isLoggedIn ? <HomeAdmin /> : <HomeHero />}
    </>
  );
}

export default Home;
