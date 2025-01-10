import { useState, useEffect } from "react";
import Navbar from "../components/MainComponents/Navbar";
import { useCart } from "../components/ShopComponents/CartContext";
import API_BASE_URL from "../constants/constants";
import axios from "axios";

const Checkout = () => {
  const { cart, calculateTotal } = useCart();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // Checkbox-Status
  const [formData, setFormData] = useState({
    user_id: "",
    total_amount: "",
    status: "pending",
    shipping_cart_id: "",
    customerEmail: "",
    firstname: "",
    lastname: "",
    street: "",
    house_number: "",
    postal_code: "",
    city: "",
  });

  const localID = localStorage.getItem("userID");
  const total = calculateTotal();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/user-manager/getUserByID/${localID}`
        );
        const {
          email,
          shipping_cart_id,
          firstname,
          lastname,
          street,
          house_number,
          postal_code,
          city,
        } = response.data.packages[0];

        setFormData((prevData) => ({
          ...prevData,
          user_id: localID,
          total_amount: total,
          shipping_cart_id,
          customerEmail: email,
          firstname: firstname,
          lastname: lastname,
          street: street,
          house_number: house_number,
          postal_code: postal_code,
          city: city,
        }));
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten:", error);
      }
    };

    if (localID) {
      fetchUserData();
    }
  }, [localID, total]);

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/order/addOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert("Bestellung erfolgreich aufgegeben");

        const clearCartResponse = await fetch(
          `${API_BASE_URL}/cart/clearCart/${localID}`,
          {
            method: "DELETE",
          }
        );

        if (clearCartResponse.ok) {
          console.log("Warenkorb erfolgreich geleert");
          setFormData({
            user_id: "",
            total_amount: "",
            status: "pending",
            shipping_cart_id: "",
            customerEmail: "",
          });

          window.location.reload();
        } else {
          console.error("Fehler beim Leeren des Warenkorbs");
        }
      } else {
        alert(data.error || "Es ist ein Fehler aufgetreten");
      }
    } catch (error) {
      console.error("Fehler beim Absenden der Daten:", error);
      alert("Server nicht erreichbar");
    }
  };

  return (
    <>
      <Navbar />
      {total === 0 ? (
        <p className="flex justify-center items-center min-h-screen text-red-500 text-2xl">
          Nichts im Warenkorb...
        </p>
      ) : (
        <div className="pt-24 pb-6">
          <div className="flex justify-center">
            <h2 className="text-4xl font-bold text-center">Checkout</h2>
          </div>
          <div className="px-8 py-6">
            <ul className="space-y-4 border-2 border-white p-4 rounded-lg">
              {cart.map((item) => (
                <li
                  key={item.wine_package_id}
                  className="flex items-center justify-between border-b pb-4 last:border-none"
                >
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white">
                      {item.package_name}
                    </h4>
                    <p className="text-sm text-gray-300">{item.price} EUR</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-400">
                      Anzahl: {item.quantity}
                    </p>
                    <div className="flex items-center space-x-2"></div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-start py-2">
              <h3 className="font-bold text-xl">
                Gesamt: {calculateTotal().toFixed(2)} EUR
              </h3>
            </div>
            <div className="flex mt-4 flex-col">
              <h3 className="font-semibold text-2xl">Lieferinformationen</h3>
              <p className="mt-2">
                {formData.firstname} {formData.lastname}
              </p>
              <p className="mt-1">
                {formData.street} {formData.house_number}
              </p>
              <p className="mt-1">
                {formData.postal_code} {formData.city}
              </p>
              <p className="mt-4">{formData.customerEmail}</p>
            </div>
          </div>
          <div className="flex flex-col justify-start py-2">
            <div className="flex mx-10 py-2">
              <input
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
                className=""
              />
              <p className="mx-2 font-extralight text-xs lg:text-sm">
                Bestätigung der Richtigkeit der Lieferadresse
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isCheckboxChecked} 
              className={`mx-8 border-2 mt-2 px-4 py-3 border-green-900 rounded-2xl 
              ${
                isCheckboxChecked
                  ? "bg-green-800 hover:bg-green-700"
                  : "cursor-not-allowed" 
              } 
              transition-all duration-500 hover:shadow-lg`}
            >
              Jetzt zahlungspflichtig bestellen
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
