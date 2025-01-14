import { useState } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="pt-1">
      <button
        onClick={toggleDropdown}
        className="hover:text-green-700 transition-all duration-500 border-2 rounded-2xl p-1 hover:border-green-600"
      >
        <User className="font-extralight" />
      </button>
      {isOpen && (
        <div
          className="absolute right-12 mt-4 w-56 rounded-md shadow-lg bg-neutral-400 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="" role="none">
            <Link
              to="/user-settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </Link>
            <Link
              to="/user"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Profile
            </Link>
            <Link
              className="block px-4 py-2 text-sm bg-red-600 text-gray-700 hover:bg-red-700"
              role="menuitem"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
