import { useState } from "react";
import { ShoppingBasket} from "lucide-react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";

const CartSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, addToCart, removeFromCart,calculateTotal, decreaseFromCart} = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative">
      <div
        className={`fixed top-20 right-0 h-full w-80 bg-gray-100 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 bg-gray-800 overflow-scroll">
          <h2 className="text-2xl font-semibold mb-4 text-white">Warenkorb</h2>
          {cart.length === 0 ? (
            <p className="text-red-500">Dein Warenkorb ist leer.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.wine_package_id}
                  className="border-b pb-4 last:border-none"
                >
                  <h4 className="text-lg font-semibold">{item.package_name}</h4>
                  <p className="text-sm text-gray-600">
                    Preis: {item.price} EUR
                  </p>
                  <div className="flex flex-row">
                    <p className="text-sm text-gray-600 flex-row flex">
                      Anzahl: {item.quantity}
                    </p>
                    <div className="px-2 pt-0.5 space-x-1">
                      <button
                        className="border-2 border-neutral-500"
                        onClick={() => addToCart(item)} 
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        className="border-2 border-neutral-500"
                        onClick={() => decreaseFromCart(item)} 
                      >
                        <Minus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.wine_package_id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-2"
                  >
                    Entfernen
                  </button>
                </li>
              ))}
            </ul>
          )}
          <h3 className="text-xl font-bold mt-4 text-white">
            Gesamtsumme: {calculateTotal().toFixed(2)} EUR
          </h3>
          <Link to="/cart">
            <button className="mt-4 w-full bg-gray-200 text-black py-2 rounded-xl">
              Zum Warenkorb
            </button>
          </Link>
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1.5 right-2 text-white p-2 rounded-full relative"
      >
        <ShoppingBasket size={35} />
        {totalItems > 0 && (
          <span className="animate-bounce absolute top-0 right-0 inline-block w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartSidebar;
