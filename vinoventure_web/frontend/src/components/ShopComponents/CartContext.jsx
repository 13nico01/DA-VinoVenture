import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null); // Benutzer-ID wird aus localStorage abgerufen
  const [isCartLoaded, setIsCartLoaded] = useState(false); // Flag, um zu wissen, ob der Warenkorb geladen wurde

  // Funktion zum Abrufen der Benutzer-ID aus localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    if (storedUserId) {
      setUserId(storedUserId); // Wenn userID im localStorage vorhanden ist, setze sie
    }
  }, []);

  // Funktion zum Abrufen des Warenkorbs des Benutzers
  const getCart = async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `http://13.60.107.62:3000/api/cart/get-cart/${userId}`
        );
        setCart(response.data.cart);
      } catch (error) {
        console.error("Fehler beim Abrufen des Warenkorbs:", error);
      } finally {
        setIsCartLoaded(true);
      }
    }
  };

  // Abrufen des Warenkorbs, wenn die Benutzer-ID gesetzt wurde
  useEffect(() => {
    if (userId && !isCartLoaded) {
      getCart();
    }
  }, [userId, isCartLoaded]);

  // Funktion zum Hinzufügen von Produkten zum Warenkorb
  const addToCart = async (product) => {
    if (!userId) {
      console.error("Fehler: Keine Benutzer-ID im localStorage gefunden.");
      return;
    }

    const existingProduct = cart.find(
      (item) => item.package_id === product.package_id
    );

    if (existingProduct) {
      // Wenn das Produkt schon im Warenkorb ist, die Menge erhöhen
      try {
        await axios.put(
          `http://13.60.107.62:3000/api/cart/update-cart/${userId}`,
          {
            package_id: product.package_id,
            quantity: existingProduct.quantity + 1,
          }
        );
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
        await axios.post(
          `http://13.60.107.62:3000/api/cart/add-cart/${userId}`,
          {
            package_id: product.package_id,
            quantity: 1,
          }
        );
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
      } catch (error) {
        console.error(
          "Fehler beim Hinzufügen des Produkts zum Warenkorb:",
          error
        );
      }
    }
  };

  // Funktion zum Entfernen eines Produkts aus dem Warenkorb
  const removeFromCart = async (id) => {
    if (!userId) {
      console.error("Fehler: Keine Benutzer-ID im localStorage gefunden.");
      return;
    }

    try {
      console.log(`Lösche Produkt mit package_id: ${id}`);

      // package_id wird jetzt als URL-Parameter übergeben, nicht im Body
      await axios.delete(
        `http://13.60.107.62:3000/api/cart/delete-cart/${userId}/${id}`
      );
      setCart((prevCart) => prevCart.filter((item) => item.package_id !== id));
    } catch (error) {
      console.error(
        "Fehler beim Entfernen des Produkts aus dem Warenkorb:",
        error
      );
    }
  };

  // Berechnung des Gesamtbetrags des Warenkorbs
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        calculateTotal,
        userId, // Die Benutzer-ID wird auch bereitgestellt, falls benötigt
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
