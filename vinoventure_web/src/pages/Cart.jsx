import React from "react";
import Navbar from "../components/MainComponents/Navbar";
import CartOverview from "../components/ShopComponents/CartOverview";

function Cart() {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <CartOverview />
      </div>
    </div>
  );
}

export default Cart;
