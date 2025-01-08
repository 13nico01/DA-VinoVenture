import { useEffect, useState } from "react";
import { Menu, X} from "lucide-react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import CartSidebar from "../ShopComponents/CartSideBar";
import ProfileButton from "./ProfileButton";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    setUsername(storedUsername || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
    localStorage.removeItem("isAdminLoggedIn");
    setUsername("");
    window.location.reload();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-3 px-6 backdrop-blur-md border-b border-neutral-700 transition-all ease-in-out duration-300 bg-black ${
        isScrolled ? "bg-opacity-90" : "bg-opacity-80"
      }`}
    >
      <div className="container px-2 mx-auto flex justify-between items-center text-sm">
        <div className="flex items-center">
          <img className="h-10 w-10 mr-3" src={logo} alt="logo" />
          <Link
            to="/"
            className="text-2xl font-semibold text-white tracking-wide"
          >
            VinoVenture
          </Link>
        </div>
        <ul className="hidden lg:flex space-x-12 text-md text-white">
          <Link to="/">Home</Link>
          <Link to="/Shop">Shop</Link>
          <Link to="/About">About</Link>
        </ul>
        <div className="hidden lg:flex space-x-6 items-center">
          {username ? (
            <>
              <CartSidebar />
              <ProfileButton />
              <span className="text-white border-2 border-black rounded-lg px-3 py-1 bg-gradient-to-r from-green-600 to-green-950">
                {username}
              </span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="py-2 px-4 border rounded-md text-white hover:bg-gray-700 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-green-600 to-green-950 py-2 px-4 rounded-md text-white hover:from-green-500 hover:to-green-700 transition-all duration-300"
              >
                Account erstellen
              </Link>
            </>
          )}
        </div>
        <div className="lg:hidden flex items-center space-x-2 lg:space-x-6">
          <button onClick={toggleNavbar} className="text-white">
            {mobileDrawerOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
          <CartSidebar />
        </div>
      </div>
      {mobileDrawerOpen && (
        <div
          className="fixed top-0 right-0 w-full h-screen bg-neutral-900 bg-opacity-90 p-6 flex flex-col items-center z-40"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <ul className="space-y-6 text-white text-xl">
            <li>
              <Link
                to="/"
                className="hover:text-green-500 transition-all duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Shop"
                className="hover:text-green-500 transition-all duration-300"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className="hover:text-green-500 transition-all duration-300"
              >
                About
              </Link>
            </li>
          </ul>
          <div className="mt-8 flex flex-col space-y-6 items-center text-white">
            {username ? (
              <>
                <span>{username}</span>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 rounded-md bg-gradient-to-r from-green-600 to-green-950 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 px-4 border rounded-lg bg-gray-400 text-black font-extrabold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-4 rounded-md bg-gradient-to-r from-green-600 to-green-950 text-white"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
