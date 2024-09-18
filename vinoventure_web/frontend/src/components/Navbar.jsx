import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { navItems } from "../constants/index.jsx";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

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

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 py-3 backdrop-brightness-50 border-b border-neutral-700/80 ${isScrolled ? 'navbar-dark' : 'bg-transparent'}`}
        >
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-10 w-10 mr-2" src={logo} alt="logo"/>
                        <span className="text-2xl tracking-tight">VinoVenture</span>
                    </div>
                    <ul className="hidden lg:flex ml-14 space-x-12 text-md">
                       <Link to="/Home">Home</Link>
                       <Link to="/Shop">Shop</Link>
                       <Link to="/About">About</Link>
                    </ul>
                    <div className="hidden lg:flex justify-center space-x-12 items-center text-md">
                        <a href="#" className="py-2 px-3 border rounded-md">
                            Login
                        </a>
                        <a href="#" className="bg-gradient-to-r from-green-600 to-green-950 py-2 px-3 rounded-md text-md">
                            Account erstellen
                        </a>
                    </div>
                    <div className="lg:hidden flex items-center">
                        <button onClick={toggleNavbar} className="text-white">
                            {mobileDrawerOpen ? <X size={24}/> : <Menu size={24}/>}
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div
                        className="fixed top-0 right-0 w-full h-screen bg-neutral-900 p-12 flex flex-col justify-center items-center lg:hidden"
                        onClick={() => setMobileDrawerOpen(false)}
                    >
                        <ul>
                            {navItems.map((item, index) => (
                                <li key={index} className="py-4">
                                    <a href={item.href} className="px-2 items-center text-white text-md border rounded-md border-gray">{item.label}</a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex space-x-6 m-4">
                            <a href="#" className="py-2 px-3 border rounded-md text-white">
                                Sign in
                            </a>
                            <a href="#" className="py-2 px-3 rounded-md bg-gradient-to-r from-green-600 to-green-900 text-white">
                                Create Account
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
