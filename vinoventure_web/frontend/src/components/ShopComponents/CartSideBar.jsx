import React, { useState } from "react";
import { ShoppingBasket, X } from "lucide-react";

const CartSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Simulierte Warenkorb-Daten
    const [cart, setCart] = useState([
        { package_id: 1, package_name: "Produkt 1", price: 10, quantity: 1 },
        { package_id: 2, package_name: "Produkt 2", price: 20, quantity: 2 },
    ]);

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.package_id !== id));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="relative">
            {/* Toggle-Button für die Sidebar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-16 right-12  text-green-700 p-2 rounded-full"
            >
                {isOpen ? <X/> : <ShoppingBasket size={40} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-22 right-0 h-full w-80 bg-gray-100 shadow-lg transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-4">Warenkorb</h2>
                    {cart.length === 0 ? (
                        <p className="text-gray-500">Dein Warenkorb ist leer.</p>
                    ) : (
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li
                                    key={item.package_id}
                                    className="border-b pb-4 last:border-none"
                                >
                                    <h4 className="text-lg font-semibold">
                                        {item.package_name}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Preis: {item.price} EUR
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Anzahl: {item.quantity}
                                    </p>
                                    <button
                                        onClick={() => removeFromCart(item.package_id)}
                                        className="text-red-500 hover:text-red-700 text-sm mt-2"
                                    >
                                        Entfernen
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <h3 className="text-xl font-bold mt-4">
                        Gesamtsumme: {calculateTotal().toFixed(2)} EUR
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
