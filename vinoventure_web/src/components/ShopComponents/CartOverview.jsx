import React from "react";
import { useCart } from "./CartContext";
import { Plus, Minus, Trash } from "lucide-react";

const CartOverview = () => {
  const { cart, removeFromCart, calculateTotal, updateQuantity } = useCart();

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">
        Warenkorb
      </h1>

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
              <p className="text-sm text-gray-400">Anzahl: {item.quantity}</p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    updateQuantity(item.wine_package_id, item.quantity + 1)
                  }
                  className="p-2 border border-neutral-500 rounded-md hover:bg-green-700"
                >
                  <Plus size={16} className="text-white" />
                </button>
                <button
                  onClick={() =>
                    updateQuantity(item.wine_package_id, item.quantity - 1)
                  }
                  className="p-2 border border-neutral-500 rounded-md hover:bg-green-700"
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} className="text-white" />
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.wine_package_id)}
              className="text-red-500 hover:text-red-700 text-sm p-2"
            >
              <Trash size={16} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h4 className="text-white text-lg font-semibold">Rabattcode</h4>
        <div className="mt-2 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Rabattcode"
            className="px-4 py-2 text-white rounded-lg w-2/3"
          />
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Anwenden
          </button>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <h3 className="text-xl font-bold text-white">
          Gesamtsumme: {calculateTotal().toFixed(2)} EUR
        </h3>
        <button
          onClick={() => alert("Zur Kasse gehen")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Zur Kasse
        </button>
      </div>
    </div>
  );
};

export default CartOverview;
