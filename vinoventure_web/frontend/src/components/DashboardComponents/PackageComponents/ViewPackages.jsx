import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const ViewPackages = () => {
  const [packages, setPackages] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterText, setFilterText] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null); // Für die Auswahl von Zeilen
  const [isDeleteMode, setIsDeleteMode] = useState(false); // Zustand für den Löschmodus
  const [isDeleteButtonActive, setIsDeleteButtonActive] = useState(false); // Zustand für den Löschbutton

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/wine-packages/get-packages"
        );
        const data = await response.json();
        if (response.ok) {
          setPackages(data.packages);
        } else {
          console.error("Fehler beim Abrufen der Pakete");
        }
      } catch (error) {
        console.error("Fehler beim Abrufen:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    const sortedPackages = [...packages].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setPackages(sortedPackages);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredPackagesVintner = packages.filter((pkg) =>
    pkg.vintner.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleDeleteClick = async (pkgId) => {
    const confirmDelete = window.confirm(
      "Sind Sie sicher, dass Sie diesen Datensatz löschen möchten?"
    );
    if (confirmDelete) {
      // Führe hier einen API-Call durch, um das Paket zu löschen
      try {
        const response = await fetch(
          `http://localhost:3000/api/wine-packages/delete-package/${pkgId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          // Aktualisiere die lokale Liste der Pakete
          const updatedPackages = packages.filter(
            (pkg) => pkg.package_id !== pkgId
          );
          setPackages(updatedPackages);
          setSelectedPackage(null);
          setIsDeleteMode(false); // Löschmodus deaktivieren
          setIsDeleteButtonActive(false); // Setze den Zustand des Löschbuttons zurück
        } else {
          alert("Fehler beim Löschen des Pakets.");
        }
      } catch (error) {
        console.error("Fehler beim Löschen:", error);
      }
    }
  };

  const handleRowClick = (pkg) => {
    if (isDeleteMode) {
      // Führe die Löschaktion sofort nach der Auswahl aus
      handleDeleteClick(pkg.package_id);
    } else {
      // Auswahl aufheben, wenn nicht im Löschmodus
      const newSelectedPackage =
        selectedPackage === pkg.package_id ? null : pkg.package_id;
      setSelectedPackage(newSelectedPackage);
      console.log(`Selected Package ID: ${newSelectedPackage}`); // Debugging
    }
  };

  const handleDeleteButtonClick = () => {
    // Toggle the delete button state
    if (isDeleteButtonActive) {
      setIsDeleteMode(false); // Deaktivieren des Löschmodus
      setIsDeleteButtonActive(false); // Setze den Löschbutton zurück
    } else {
      setIsDeleteMode(true); // Aktivieren des Löschmodus
      setIsDeleteButtonActive(true); // Setze den Löschbutton auf aktiv
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-2xl font-bold text-center mb-4">Verfügbare Pakete</h2>

      {/* Toolbar */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={filterText}
          onChange={handleFilterChange}
          placeholder="Nach Winzer filtern"
          className="border border-gray-300 p-2 rounded"
        />
        <div>
          <button
            onClick={handleDeleteButtonClick} // Löschmodus aktivieren
            className={`py-2 px-4 rounded mr-2 ${
              isDeleteButtonActive
                ? "bg-red-950 text- transition duration-300"
                : "bg-red-500 transition duration-300"
            } text-white transition duration-300`}
          >
            <Trash2 />
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-black border-b-2 border-black">
          <tr>
            <th
              className="py-2 px-4 border-b border-r cursor-pointer"
              onClick={() => handleSort("package_name")}
            >
              Paketname{" "}
              {sortField === "package_name" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="py-2 px-4 border-b border-r cursor-pointer"
              onClick={() => handleSort("description")}
            >
              Beschreibung{" "}
              {sortField === "description" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="py-2 px-4 border-b border-r cursor-pointer"
              onClick={() => handleSort("wine_count")}
            >
              Anzahl Weine{" "}
              {sortField === "wine_count" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="py-2 px-4 border-b border-r cursor-pointer"
              onClick={() => handleSort("vintner")}
            >
              Weingut{" "}
              {sortField === "vintner" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="py-2 px-4 border-b border-r cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Preis {sortField === "price" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer"
              onClick={() => handleSort("suitable_for_persons")}
            >
              Personen{" "}
              {sortField === "suitable_for_persons" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredPackagesVintner.length > 0 ? (
            filteredPackagesVintner.map((pkg) => (
              <tr
                key={pkg.id}
                className={`hover:bg-gray-400 transition duration-500 border-b border-black text-black ${
                  selectedPackage === pkg.id ? "bg-gray-300" : ""
                }`}
                onClick={() => handleRowClick(pkg)}
              >
                <td className="py-2 px-4 border-r border-black">
                  {pkg.package_name}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {pkg.description}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {pkg.wine_count}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {pkg.vintner}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {pkg.price.toFixed(2)} €
                </td>
                <td className="py-2 px-4">{pkg.suitable_for_persons}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="py-2 px-4 text-center text-red-600 font-bold bg-gray-500"
              >
                Keine Pakete verfügbar!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPackages;
