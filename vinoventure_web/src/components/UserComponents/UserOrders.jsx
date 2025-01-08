import { useEffect, useState } from "react";
import API_BASE_URL from "../../constants/constants";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/order/getUsersOrders/${userID}`
        );
        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders);
        } else {
          console.error("Fehler beim Abrufen der Bestellungen");
        }
      } catch (error) {
        console.error("Fehler beim Abrufen:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Deine Bestellungen</h1>

        {orders.length > 0 ? (
          <table className="table-auto border-collapse w-full mx-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Datum</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Preis</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id} className="border-b">
                  <td className="border px-4 py-2">{order.order_id}</td>
                  <td className="border px-4 py-2">{order.ordered_at}</td>
                  <td className="border px-4 py-2">{order.status}</td>
                  <td className="border px-4 py-2">€{order.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Keine Bestellungen vorhanden.</p>
        )}
      </div>
    </>
  );
};

export default UserOrders;
