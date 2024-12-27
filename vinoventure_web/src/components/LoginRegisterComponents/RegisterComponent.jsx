import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Importiere Eye-Icons aus lucide-react

const RegisterComponent = () => {
  const [step, setStep] = useState(1); // Aktuellen Schritt verfolgen
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthDate: "",
    firstname: "",
    lastname: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false); // Zustand für die Sichtbarkeit des Passworts

  // Funktion für das Handling von Änderungen in den Inputfeldern
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funktion zum Validieren des Alters (mindestens 16 Jahre alt)
  const isOldEnough = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    return age > 16 || (age === 16 && month >= 0);
  };

  // Funktion zum Validieren des Passworts (mindestens 8 Zeichen)
  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  // Funktion zur Überprüfung der Formulardaten, bevor es abgeschickt wird
  const handleSubmit = (e) => {
    e.preventDefault();

    // Altersprüfung
    if (!isOldEnough(formData.birthDate)) {
      alert("Du musst mindestens 16 Jahre alt sein.");
      return;
    }

    // Passwortlängenprüfung
    if (!isPasswordValid(formData.password)) {
      alert("Das Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }

    console.log("Form Submitted", formData);
    // Simuliere eine Serveranfrage (ersetze dies mit deiner tatsächlichen Datenbankabfrage)
    // const [result] = await db.query("INSERT INTO users ...");
    // Nach erfolgreichem Absenden, kannst du die Nutzer weiterleiten
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm p-8 space-y-6 bg-neutral-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Registrierung</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1 - Basic Information */}
          {step === 1 && (
            <>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Email Adresse"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Passwort"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-2 flex items-center"
                  >
                    {passwordVisible ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                  Geburtsdatum
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full px-4 py-2 font-semibold text-white bg-green-700 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Next
              </button>
            </>
          )}

          {/* Step 2 - Address and Name */}
          {step === 2 && (
            <>
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                  Vorname
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Vorname"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                  Nachname
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Nachname"
                  required
                />
              </div>
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Straße
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Straße"
                  required
                />
              </div>
              <div>
                <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">
                  Hausnummer
                </label>
                <input
                  type="text"
                  id="houseNumber"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Hausnummer"
                  required
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  PLZ
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="PLZ"
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Stadt
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Stadt"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handlePreviousStep}
                className="w-full px-4 py-2 font-semibold text-white bg-gray-600 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Zurück
              </button>
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-green-700 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Register
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
