import React from "react";
import Navbar from "../components/MainComponents/Navbar";
import SingleProduct from "../components/ShopComponents/SingleProduct";

function ProductDetails() {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <SingleProduct />
      </div>
    </div>
  );
}

export default ProductDetails;
