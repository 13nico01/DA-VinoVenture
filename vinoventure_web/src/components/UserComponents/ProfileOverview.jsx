import { useEffect, useState } from "react";
import { User, Truck, CircleHelp } from "lucide-react";
import UserOrders from "./UserOrders";

const ProfileOverview = () => {
  const [username, setUsername] = useState("");
  const [item, setItem] = useState("profile");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    setUsername(storedUsername);
  }, []);

  const renderContent = () => {
    switch (item) {
      case "profile":
        return <p>Profil Einstellungen</p>;
      case "orders":
        return <UserOrders />;
      case "support":
        return <p>Support</p>;
      default:
        return null;
    }
  };

  return (
    <>
      {username ? (
        <div className="flex h-screen pt-20">
          <div className="w-1/6 bg-green-700 border-2 border-black rounded-b-2xl text-white p-4 mr-8">
            <ul>
              <li className="text-center font-bold bg-green-800 p-2">
                Welcome, <span className="text-neutral-200">{username}</span>
              </li>
              <li
                className={`cursor-pointer py-2 px-2 flex space-x-2 border-b-2${
                  item === "profile" ? " bg-green-600" : ""
                }`}
                onClick={() => setItem("profile")}
              >
                <User className="mr-2" />
                Profil Einstellungen
              </li>
              <li
                className={`cursor-pointer py-2 px-2 flex space-x-2 border-b-2${
                  item === "orders" ? " bg-green-600" : ""
                }`}
                onClick={() => setItem("orders")}
              >
                <Truck className="mr-2 font-thin" />
                Bestellungen
              </li>
              <li
                className={`cursor-pointer py-2 px-2 flex space-x-2${
                  item === "support" ? " bg-green-600" : ""
                }`}
                onClick={() => setItem("support")}
              >
                <CircleHelp className="mr-2" />
                Support
              </li>
            </ul>
          </div>
          <div>{renderContent()}</div>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </>
  );
};

export default ProfileOverview;
