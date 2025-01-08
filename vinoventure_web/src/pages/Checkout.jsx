import { useState } from "react";
import Navbar from "../components/MainComponents/Navbar";
import { useCart } from "../components/ShopComponents/CartContext";

const Checkout = () => {
  const { cart, calculateTotal } = useCart();
  const [formData, setFormData] = useState({
    user_id: "",
    total_amount: "",
    status: "pending",
    shipping_cart_id: "",
    customerEmail: "",
  });

  const localID = localStorage.getItem("userID");
  const total = calculateTotal();

  formData.user_id = localID;
  formData.total_amount = total;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://vino-venture.com/3000/api/order/addOrder",
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
        alert("Bestellung erfolgreich aufgegeben");
        setFormData({
          user_id: "",
          total_amount: "",
          status: "pending",
          shipping_cart_id: "",
          customerEmail: "",
        });
      } else {
        alert(data.error || "Es ist ein Fehler aufgetreten");
      }
    } catch (error) {
      console.error("Fehler beim absenden der Daten", error);
      alert("Server nicht erreichbar");
    }
  };
  console.log(formData)
  return (
    <>
      <Navbar />
      <div className="pt-20 pb-6">
        <div className="flex justify-center">
          <h2 className="text-4xl font-bold text-center">Checkout</h2>
        </div>
        <div className="mx-auto px-4 py-6">
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
          <div className="flex justify-end py-2">
            <h3 className="font-bold text-xl">Gesamt: {calculateTotal()}</h3>
          </div>
        </div>
        <div className=" flex justify-center py-2">
          <button
            onClick={handleSubmit}
            className=" border-2 px-4 py-2 border-white rounded-2xl hover:text-green-600 transition-all duration-500 hover:shadow-lg "
          >
            Jetzt bestellen
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
