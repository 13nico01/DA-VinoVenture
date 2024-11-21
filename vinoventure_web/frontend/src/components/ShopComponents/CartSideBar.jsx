import React, { useState } from "react";
import { useCart } from "./CartContext";

const CartSidebar = () => {
    const { cart, removeFromCart, calculateTotal } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Toggle-Button für die Sidebar */}
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Schließen" : "Warenkorb anzeigen"}
            </button>

            {/* Sidebar */}
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        right: 0,
                        top: 0,
                        width: "300px",
                        height: "100%",
                        backgroundColor: "#f8f8f8",
                        boxShadow: "-2px 0 5px rgba(0,0,0,0.3)",
                        padding: "20px",
                        overflowY: "auto",
                    }}
                >
                    <h2>Warenkorb</h2>
                    {cart.length === 0 ? (
                        <p>Dein Warenkorb ist leer.</p>
                    ) : (
                        <ul>
                            {cart.map((item) => (
                                <li key={item.package_id} style={{ marginBottom: "15px" }}>
                                    <h4>{item.package_name}</h4>
                                    <p>Preis: {item.price} EUR</p>
                                    <p>Anzahl: {item.quantity}</p>
                                    <button
                                        onClick={() => removeFromCart(item.package_id)}
                                        style={{ color: "red" }}
                                    >
                                        Entfernen
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <h3>Gesamtsumme: {calculateTotal().toFixed(2)} EUR</h3>
                </div>
            )}
        </div>
    );
};

export default CartSidebar;
