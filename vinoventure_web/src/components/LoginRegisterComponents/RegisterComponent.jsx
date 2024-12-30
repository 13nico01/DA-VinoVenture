import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthdate: "",
    firstname: "",
    lastname: "",
    street: "",
    house_number: "",
    postal_code: "",
    city: "",
    status: "active",
    role: "user",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength === 0) return "";
    if (strength <= 1) return "Schwach";
    if (strength === 2 || strength === 3) return "Mittel";
    if (strength === 4) return "Stark";
  };

  const isOldEnough = (birthdate) => {
    const today = new Date();
    const birth = new Date(birthdate);
    const age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    return age > 16 || (age === 16 && month >= 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOldEnough(formData.birthdate)) {
      alert("Du musst mindestens 16 Jahre alt sein.");
      return;
    }

    if (passwordStrength === "Schwach") {
      alert(
        "Das Passwort ist zu schwach. Bitte ein stärkeres Passwort eingeben."
      );
      return;
    }

    try {
      const response = await fetch(
        "https://vino-venture.com/3000/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.status === 201) {
        alert("Benutzer erstellt");
        setFormData({
          username: "",
          email: "",
          password: "",
          birthdate: "",
          firstname: "",
          lastname: "",
          street: "",
          house_number: "",
          postal_code: "",
          city: "",
          status: "active",
          role: "user",
        });
        navigate("/");
      } else {
        alert(data.error || "Es ist ein Fehler aufgetreten");
      }
    } catch (error) {
      console.error("Fehler beim Absenden der Daten", error);
      alert("Server nicht erreichbar");
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="flex justify-center items-center min-h-screen text-white px-4">
        <div className="w-full max-w-md p-10 space-y-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-green-600">
            Registrierung
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Benutzername
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Benutzername"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Email Adresse"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Passwort
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Passwort"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-green-500"
                    >
                      {passwordVisible ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {passwordStrength && (
                    <div
                      className={`mt-2 text-sm font-semibold ${
                        passwordStrength === "Schwach"
                          ? "text-red-500"
                          : passwordStrength === "Mittel"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      Passwortstärke: {passwordStrength}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="birthdate"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Geburtsdatum
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Nächster Schritt
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="gap-4">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Vorname
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Vorname"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Nachname
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Nachname"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Straße
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Straße"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="house_number"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Hausnummer
                    </label>
                    <input
                      type="text"
                      id="house_number"
                      name="house_number"
                      value={formData.house_number}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Hausnummer"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="postal_code"
                      className="block text-sm font-medium text-gray-300"
                    >
                      PLZ
                    </label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="PLZ"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Stadt
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Stadt"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Zurück
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Registrieren
                </button>
              </>
            )}
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Bereits registriert?{" "}
              <Link
                to="/login"
                className="text-green-500 hover:text-green-400 font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
