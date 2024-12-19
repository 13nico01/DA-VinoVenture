import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { BACKEND_IP } from "../../constants/constants";

const MainShop = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get({BACKEND_IP},"/api/shop/products")
      .then((response) => {
        console.log("API-Antwort:", response.data);
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error(
            "Erwartetes Array, aber keine erhalten:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Produkte", error);
      });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Produkte</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(products) ? (
          products.map((product) => (
            <div
              key={product.wine_package_id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={product.image_url}
                alt={product.package_name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  {product.package_name}
                </h3>
                <p className="text-lg text-gray-700 mt-2"> {product.price} €</p>
                <div className="justify-center">
                  <Link to={`/product/${product.wine_package_id}`}>
                    <button className="mt-4 px-4 text-sm bg-green-700 text-white py-2 rounded-lg hover:bg-green-900">
                      Details ansehen
                    </button>
                  </Link>

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 px-2 mx-2 text-sm bg-green-900 text-white py-2 rounded-lg hover:bg-green-900"
                  >
                    Warenkorb
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500">
            Keine Produkte gefunden oder falsche Datenstruktur
          </p>
        )}
      </div>
    </div>
  );
};

export default MainShop;
