import React, { useEffect, useState } from "react";

const ViewPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/wine-packages/get-packages");
        const data = await response.json();
        if (response.ok) {
          setPackages(data.packages); // Angenommen, die Antwort enthält ein "packages"-Array
        } else {
          console.error("Fehler beim Abrufen der Pakete");
        }
      } catch (error) {
        console.error("Fehler beim Abrufen:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-2xl font-bold text-center mb-4">Verfügbare Pakete</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-black border-b-2 border-black">
          <tr>
            <th className="py-2 px-4 border-b border-r">Paketname</th>
            <th className="py-2 px-4 border-b border-r">Beschreibung</th>
            <th className="py-2 px-4 border-b border-r">Anzahl Weine</th>
            <th className="py-2 px-4 border-b border-r">Weingut</th>
            <th className="py-2 px-4 border-b border-r">Preis</th>
            <th className="py-2 px-4 border-b">Personen</th>
          </tr>
        </thead>
        <tbody>
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-gray-400 transition duration-500 border-b border-black text-black">
                <td className="py-2 px-4 border-r border-black">{pkg.package_name}</td>
                <td className="py-2 px-4 border-r border-black">{pkg.description}</td>
                <td className="py-2 px-4 border-r border-black">{pkg.wine_count}</td>
                <td className="py-2 px-4 border-r border-black">{pkg.vintner}</td>
                <td className="py-2 px-4 border-r border-black">{pkg.price.toFixed(2)} €</td>
                <td className="py-2 px-6">{pkg.suitable_for_persons}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-2 px-4 text-center">Keine Pakete verfügbar</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPackages;
