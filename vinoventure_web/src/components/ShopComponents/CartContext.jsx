import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../constants/constants";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const getCart = async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/cart/get-Cart/${userId}`
        );
        setCart(response.data.cart);
        if (cart.length === 0) {
          console.log("Warenkorb ist leer");
        }
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
    if (!userId) {
      console.log("Not logged in");
      alert("Nicht eingeloggt!")
      return;
    }

    const existingProduct = cart.find(
      (item) => item.wine_package_id === product.wine_package_id
    );

    if (existingProduct) {
      try {
        await axios.put(`${API_BASE_URL}/cart/update-Cart/${userId}`, {
          wine_package_id: product.wine_package_id,
          quantity: existingProduct.quantity + 1,
        });
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
      try {
        await axios.post(`${API_BASE_URL}/cart/add-Cart/${userId}`, {
          wine_package_id: product.wine_package_id,
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

  const removeFromCart = async (wine_package_id) => {
    if (!userId) {
      console.error("Fehler: Keine Benutzer-ID im localStorage gefunden.");
      return;
    }

    try {
      console.log(`Lösche Produkt mit wine_package_id: ${wine_package_id}`);

      await axios.delete(
        `${API_BASE_URL}/cart/delete-Cart/${userId}/${wine_package_id}`
      );
      setCart((prevCart) =>
        prevCart.filter((item) => item.wine_package_id !== wine_package_id)
      );
    } catch (error) {
      console.error(
        "Fehler beim Entfernen des Produkts aus dem Warenkorb:",
        error
      );
    }
  };

  const decreaseFromCart = async (product) => {
    if (!userId) {
      console.error("Fehler: Keine Benutzer-ID im localStorage gefunden.");
      return;
    }

    const existingProduct = cart.find(
      (item) => item.wine_package_id === product.wine_package_id
    );

    if (existingProduct && existingProduct.quantity > 1) {
      try {
        await axios.put(`${API_BASE_URL}/cart/update-Cart/${userId}`, {
          wine_package_id: product.wine_package_id,
          quantity: existingProduct.quantity - 1,
        });
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.wine_package_id === product.wine_package_id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      } catch (error) {
        console.error("Fehler beim Aktualisieren des Warenkorbs:", error);
      }
    } else {
      removeFromCart(product.wine_package_id);
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
        decreaseFromCart,
        userId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
