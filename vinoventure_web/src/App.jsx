import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const App = () => {
  return (
    <>
      <Navbar />
        <div className="max-w-7xl mx-auto pt-20 px-6">
            <Hero />
        </div>
    </>
  );
};

export default App;
