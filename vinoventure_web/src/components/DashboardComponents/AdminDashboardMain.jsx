import { ShieldBan, Package, Users, LogOut, Menu, Truck } from "lucide-react";
import { useState } from "react";
import PackageManager from "./PackageManager";
import AdminManager from "./AdminManager";
import UserManagerMain from "../DashboardComponents/UserManager/UserManagerMain";
import ViewOrders from "./ViewOrders";

function AdminDashboardSidebar() {
  const [content, setContent] = useState("Paket-Manager");

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Möchten Sie sich wirklich ausloggen?"
    );
    if (confirmLogout) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleMenuClick = (newContent) => {
    setContent(newContent);
  };

  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <Menu
          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
        />
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 mt-16 py-6 overflow-y-auto bg-gradient-to-br from-green-800 to-green-950 dark:bg-gray-900">
          <ul className="space-y-4 font-medium">
            <li>
              <a
                href="#"
                onClick={() => handleMenuClick("Paket-Manager")}
                className="flex border-2 items-center p-2 transition-colors duration-50 text-white rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-400 hover:text-black group"
              >
                <Package
                  className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                />
                <span className="ms-3">Weinpakete</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleMenuClick("Order-Overview")}
                className="flex border-2 items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-400 hover:text-black group"
              >
                <Truck
                  className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Bestellungen
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleMenuClick("User-Overview")}
                className="flex border-2 items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-400 hover:text-black group"
              >
                <Users
                  className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Benutzer</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleMenuClick("Admin-Settings")}
                className="flex border-2 items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-400 hover:text-black group"
              >
                <ShieldBan
                  className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Admin-Settings
                </span>
              </a>
            </li>
            <hr className="border-t-2 border-gray-300" />
            <li>
              <a
                href="#"
                onClick={handleLogout}
                className="flex border-2 items-center p-2 bg-red-800 text-white rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-400 hover:text-black group"
              >
                <LogOut
                  className="flex-shrink-0 w-5 h-5 text-gray-300 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="sm:ml-64">
        <div className="rounded-lg dark:border-gray-700">
          <div className="py-4 px-2">
            {content === "Paket-Manager" && <PackageManager />}
            {content === "Admin-Settings" && <AdminManager />}
            {content === "User-Overview" && <UserManagerMain />}
            {content === "Order-Overview" && <ViewOrders />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardSidebar;
