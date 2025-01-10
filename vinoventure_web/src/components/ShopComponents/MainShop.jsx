import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import API_BASE_URL from "../../constants/constants";
import placeholder from "../../assets/Images/placeholder-square.jpg";

const MainShop = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/shop/products`)
      .then((response) => {
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);
        } else {
          console.error("Fehlerhafte Datenstruktur", response.data);
        }
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Produkte", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.package_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const resetFilters = () => {
    setSearchQuery("");
    setFilteredProducts(products);
  };

  return (
    <div className="relative">
      <div className="max-w-screen-xl mx-auto px-4 pt-6 pb-20 relative z-10">
        <h1 className="text-3xl font-bold text-center mb-6">Produkte</h1>

        <div className="flex justify-between mb-6">
          <input
            type="text"
            placeholder="Suche Produkte..."
            className="p-2 w-1/3 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={resetFilters}
            className="p-2 bg-gray-500 text-white rounded-md"
          >
            Filter zurücksetzen
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.wine_package_id}
                  className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={placeholder}
                    alt={product.package_name}
                    className="w-full h-64 p-2 rounded-lg object-cover transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="text-md font-semibold text-gray-900 product-name">
                      {product.package_name}
                    </h3>
                    <p className="text-lg text-gray-700 mt-2 product-price">
                      {product.price} €
                    </p>
                    <div className="justify-center">
                      <Link to={`/product/${product.wine_package_id}`}>
                        <button className="mt-4 w-full px-4 py-2 bg-green-700 text-white text-sm rounded-lg hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300">
                          Details ansehen
                        </button>
                      </Link>
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-2 px-4 py-2 w-full bg-green-900 text-white text-sm rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                      >
                        Zum Warenkorb hinzufügen
                      </button>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="ml-2 text-sm text-gray-600">
                        (4.5 von 5 Sternen)
                      </span>
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
        )}
      </div>
    </div>
  );
};

export default MainShop;
