import Navbar from "../components/MainComponents/Navbar";
import SingleProduct from "../components/ShopComponents/SingleProduct";
import FooterMain from "../components/MainComponents/Footer";

function ProductDetails() {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <SingleProduct />
      </div>
      <FooterMain/>
    </div>
  );
}

export default ProductDetails;
