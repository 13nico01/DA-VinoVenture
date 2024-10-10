import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddPackage from "./AddPackage";
import ViewPackages from "./ViewPackages";
import { useEffect } from "react";

const AddWinePackage = () => {
  return (
    <div className="pt-4 pb-6">
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
  const [packageCount, setPackageCount] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3000/api/wine-packages/get-package-count")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Netzwerkantwort war nicht in Ordnung");
        }
        return response.json();
      })
      .then((data) => {
        setPackageCount(data.count);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Anzahl der Weinpakete:", error);
      });
  }, []);
  return (
    <div>
      <h2 className="text-white md:text-4xl sm:text-2xl font-bold text-center pt-4">
        Willkommen im Paket Manager
      </h2>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 sm:w-1/4 p-4 border-2 rounded mt-8 md:ml-8 sm:ml-4">
          <h2 className="text-md text-white text-left pt-4 font-bold">
            Anzahl Pakete:{" "}
            <span className="text-green-500">{packageCount}</span>
          </h2>
        </div>
        <div className="w-full md:w-1/2 px-6 pb-4 border-2 rounded mt-8 md:ml-8 sm:ml-4">
          <p className="text-md text-white text-left pt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
            sed perferendis numquam labore consectetur. Perferendis maxime magni
            eum incidunt totam corporis sit esse, animi molestiae, recusandae
            quas aperiam error quis. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Dolorem sed perferendis numquam labore
            consectetur. Perferendis maxime magni eum incidunt totam corporis
            sit esse, animi molestiae, recusandae quas aperiam error quis. Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Dolorem sed
            perferendis numquam labore consectetur. Perferendis maxime magni eum
            incidunt totam corporis sit esse, animi molestiae, recusandae quas
            aperiam error quis.
          </p>
        </div>
      </div>
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
          <div className="text-white text-xl font-bold">Package Manager</div>
          <div className="flex space-x-4">
            <button
              onClick={() => handleContentChange("start")}
              className="text-white text-md hover:text-gray-300 border rounded-md py-2 px-2"
            >
              Start
            </button>
            <button
              onClick={() => handleContentChange("add")}
              className="text-white text-md hover:text-gray-300 border rounded-md py-2 px-2"
            >
              Paket hinzufügen
            </button>
            <button
              onClick={() => handleContentChange("view")}
              className="text-white text-md hover:text-gray-300 border rounded-md py-2 px-2"
            >
              Pakete anzeigen/bearbeiten
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
