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
      (item) => item.wine_package_id === product.wine_package_id
    );

    if (existingProduct) {
      // Wenn das Produkt schon im Warenkorb ist, die Menge erhöhen
      try {
        await axios.put(
          `http://13.60.107.62:3000/api/cart/update-cart/${userId}`,
          {
            wine_package_id: product.wine_package_id,
            quantity: existingProduct.quantity + 1,
          }
        );
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.wine_package_id === product.wine_package_id
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
            wine_package_id: product.wine_package_id,
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

  const removeFromCart = async (wine_package_id) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error("Fehler: Keine Benutzer-ID im localStorage gefunden.");
      return;
    }
  
    // Debugging: Prüfe, ob wine_package_id korrekt ist
    console.log("Wine Package ID zum Entfernen:", wine_package_id);
    if (!wine_package_id) {
      console.error("Fehler: wine_package_id ist nicht definiert.");
      return;
    }
  
    const url = `http://13.60.107.62:3000/api/cart/delete-cart/${userId}/${wine_package_id}`;
    console.log("Generierte URL:", url);
  
    try {
      console.log(`Sende DELETE-Request an URL: ${url}`);
      await axios.delete(url);
      console.log("Produkt erfolgreich gelöscht.");
    } catch (error) {
      console.error("Fehler beim Löschen des Produkts:", error.response || error.message);
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
