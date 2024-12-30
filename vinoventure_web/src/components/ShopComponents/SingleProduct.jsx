import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useCart } from "./CartContext";
import API_BASE_URL from "../../constants/constants";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/shop/products/${id}`)
      .then((response) => {
        setProduct(response.data.product);
        setIsLoading(false);
        const currentProductId = parseInt(id, 10); 

        const nextProductIds = Array.from({ length: 4}, (_, index) => currentProductId + index + 1);

        return axios.all(
          nextProductIds.map((productId) =>
            axios.get(`${API_BASE_URL}/api/shop/products/${productId}`)
          )
        );
      })
      .then((responses) => {
        const products = responses.map((response) => response.data.product);
        setRelatedProducts(products);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Produktdetails:", error);
        setError("Es gab ein Problem beim Laden der Produktdetails.");
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return <p>Produkt nicht gefunden.</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <h1 className="text-4xl font-semibold text-center mb-6 text-white">
        {product.package_name}
      </h1>
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        <img
          src={product.image_url}
          alt={product.package_name}
          className="w-full lg:w-1/2 object-cover h-96 rounded-lg shadow-lg"
          loading="lazy"
        />
        <div className="flex flex-col justify-center lg:w-1/2">
          <p className="text-xl mt-2 font-bold text-white">{product.price} EUR</p>
          <p className="text-md mt-4 text-gray-100">{product.description}</p>
          <p className="text-sm mt-4 text-gray-400">
            <span className="font-semibold text-gray-400">Geeignet für:</span>{" "}
            {product.suitable_for_persons} Personen
          </p>
          <div className="mt-6">
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-green-800 text-white py-3 rounded-lg shadow-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              In den Warenkorb
            </button>
            <button className="mt-4 w-full bg-gray-800 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              <Link to="/shop">Alle Produkte ansehen</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="my-20">
        <h2 className="text-2xl font-semibold text-center mb-6">Weitere Produkte</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.wine_package_id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <img
                  src={relatedProduct.image_url}
                  alt={relatedProduct.package_name}
                  className="w-full h-64 object-cover transition-transform duration-300 rounded-t-lg"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900">{relatedProduct.package_name}</h3>
                  <p className="text-lg text-gray-700 mt-2">{relatedProduct.price} €</p>
                  <Link to={`/product/${relatedProduct.wine_package_id}`}>
                    <button className="mt-4 px-4 py-2 bg-green-700 text-white text-sm rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300">
                      Details ansehen
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Keine weiteren Produkte gefunden.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
