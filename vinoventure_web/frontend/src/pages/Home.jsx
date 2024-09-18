import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Hero from "../components/HomeHero";
import HomeAdmin from "../components/HomeAdmin";

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
      {isLoggedIn ? <HomeAdmin /> : <Hero />}
    </>
  );
}

export default Home;
