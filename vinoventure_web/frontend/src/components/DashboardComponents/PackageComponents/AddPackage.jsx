import React, { useState } from "react";

const AddPackage = () => {
  const [formData, setFormData] = useState({
    package_name: "",
    description: "",
    wine_count: "",
    vintner: "",
    price: "",
    suitable_for_persons: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/wine-packages/add-package",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({
          package_name: "",
          description: "",
          wine_count: "",
          vintner: "",
          price: "",
          suitable_for_persons: "",
        });
      } else {
        alert("Fehler beim Hinzufügen des Weinpakets");
      }
    } catch (error) {
      console.error("Fehler beim Hinzufügen:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-gray-300 p-8 shadow-md rounded-lg"
      >
        <h2 className="text-2xl text-black font-bold mb-6 text-center">Weinpaket erstellen</h2>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Paketname</label>
          <input
            type="text"
            name="package_name"
            minLength={3}
            value={formData.package_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            placeholder="Name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Beschreibung</label>
          <textarea
            name="description"
            minLength={10}
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            placeholder="Beschreibung (min. 10 Zeichen)"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Anzahl Weine</label>
          <input
            type="number"
            name="wine_count"
            min="1"
            max="20"
            value={formData.wine_count}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            placeholder="0"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Weingut</label>
          <input
            type="text"
            name="vintner"
            minLength={3}
            value={formData.vintner}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            placeholder="Weingut"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Preis</label>
          <input
            type="number"
            step="0.01"
            name="price"
            min="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            placeholder="0.00"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">
            Geeignet für Personen
          </label>
          <input
            type="number"
            name="suitable_for_persons"
            min="1"
            value={formData.suitable_for_persons}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            placeholder="0"
          />
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900 transition duration-700"
        >
          Weinpaket hinzufügen
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
