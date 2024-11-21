import React from "react";
import Navbar from "../components/MainComponents/Navbar";
import SingleProduct from "../components/ShopComponents/SingleProduct";
import CartSidebar from "../components/ShopComponents/CartSideBar";

function ProductDetails() {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <SingleProduct />
        <CartSidebar/>
      </div>
    </div>
  );
}

export default ProductDetails;
