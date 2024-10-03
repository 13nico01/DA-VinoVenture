import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddPackage from "./AddPackage";
import ViewPackages from "./ViewPackages";

const AddWinePackage = () => {
  return (
    <div className="pt-16 pb-16">
      <AddPackage />
    </div>
  );
};

const ViewWinePackages = () => {
  return (
    <div className="pt-2">
      <ViewPackages />
    </div>
  );
};

const DefaultContent = () => {
  return (
    <div>
      <h2 className="text-white text-4xl font-bold text-center pt-4">
        Willkommen im Paket Manager
      </h2>
    </div>
  );
};

const PackageNavbar = () => {
  // Zustand für den aktuell ausgewählten Inhalt
  const [activeContent, setActiveContent] = useState("start");

  // Funktion zum Setzen des Inhalts basierend auf der Auswahl
  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="pb-2 border-b border-neutral-100">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Package Manager</div>
          <div className="flex space-x-4">
            <button
              onClick={() => handleContentChange("start")}
              className="text-white hover:text-gray-300 border rounded-md py-2 px-2"
            >
              Start
            </button>
            <button
              onClick={() => handleContentChange("add")}
              className="text-white hover:text-gray-300 border rounded-md py-2 px-2"
            >
              Paket hinzufügen
            </button>
            <button
              onClick={() => handleContentChange("view")}
              className="text-white hover:text-gray-300 border rounded-md py-2 px-2"
            >
              Pakete anzeigen
            </button>
          </div>
        </div>
      </nav>

      {/* Dynamisch gerenderter Inhalt */}
      <div className="container mx-auto mt-4">
        <AnimatePresence mode="wait">
          {activeContent === "start" && (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 20 }} // Startzustand
              animate={{ opacity: 1, y: 0 }} // Endzustand
              exit={{ opacity: 0, y: -20 }} // Zustand beim Verlassen
              transition={{ duration: 0.5 }} // Übergangsdauer
            >
              <DefaultContent />
            </motion.div>
          )}
          {activeContent === "add" && (
            <motion.div
              key="add"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AddWinePackage />
            </motion.div>
          )}
          {activeContent === "view" && (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ViewWinePackages />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default PackageNavbar;
