import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useCart } from "./CartContext";
import API_BASE_URL from "../../constants/constants";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/shop/products/${id}`)
      .then((response) => {
        console.log("Produktdetails:", response.data);
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Produktdetails:", error);
      });
  }, [id]);

  if (!product) {
    return <p>Lade Produktdetails...</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        {product.package_name}
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <img
          src={product.image_url}
          alt={product.package_name}
          className="w-full lg:w-1/2 object-cover h-96"
        />
        <div className="flex flex-col justify-center">
          <p className="text-lg mt-2 font-bold">{product.price} EUR</p>
          <p className="text-sm mt-4">{product.description}</p>
          <p className="text-sm mt-4">
            <span className="font-bold">Geeignet für:</span>{" "}
            {product.suitable_for_persons} Personen
          </p>
          <button
            onClick={() => addToCart(product)}
            className="mt-6 w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-900"
          >
            In den Warenkorb
          </button>
          <button className="mt-4 w-full bg-green-950 text-white py-2 rounded-lg">
            <Link to="/shop">Alle Produkte</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
