import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null); // Hier speicherst du die Benutzer-ID
  const [isCartLoaded, setIsCartLoaded] = useState(false); // Flag, um zu wissen, ob der Warenkorb geladen wurde

  // Setze die Benutzer-ID beim Login
  const setUser = (id) => {
    setUserId(id);
  };

  // Funktion zum Abrufen des Warenkorbs des Benutzers bei der Anmeldung
  const getCart = async () => {
    if (userId) {
      try {
        const response = await axios.get(`/api/cart/${userId}`);
        setCart(response.data.cart);
      } catch (error) {
        console.error("Fehler beim Abrufen des Warenkorbs:", error);
      } finally {
        setIsCartLoaded(true);
      }
    }
  };

  useEffect(() => {
    if (userId && !isCartLoaded) {
      getCart();
    }
  }, [userId, isCartLoaded]);

  const addToCart = async (product) => {
    const existingProduct = cart.find(
      (item) => item.package_id === product.package_id
    );

    if (existingProduct) {
      // Wenn das Produkt schon im Warenkorb ist, die Menge erhöhen
      try {
        await axios.put(`/api/cart/${userId}`, {
          package_id: product.package_id,
          quantity: existingProduct.quantity + 1,
        });
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.package_id === product.package_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } catch (error) {
        console.error("Fehler beim Aktualisieren des Warenkorbs:", error);
      }
    } else {
      // Andernfalls das Produkt zum Warenkorb hinzufügen
      try {
        await axios.post(`/api/cart/${userId}`, {
          package_id: product.package_id,
          quantity: 1,
        });
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
      } catch (error) {
        console.error(
          "Fehler beim Hinzufügen des Produkts zum Warenkorb:",
          error
        );
      }
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`/api/cart/${userId}`, {
        data: { package_id: id },
      });
      setCart((prevCart) => prevCart.filter((item) => item.package_id !== id));
    } catch (error) {
      console.error(
        "Fehler beim Entfernen des Produkts aus dem Warenkorb:",
        error
      );
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        calculateTotal,
        setUser, // Damit der Benutzer sich einloggen und seine ID setzen kann
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
