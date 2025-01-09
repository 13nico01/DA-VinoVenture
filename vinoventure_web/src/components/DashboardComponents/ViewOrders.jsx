import { useEffect, useState } from "react";
import API_BASE_URL from "../../constants/constants";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/order/getOrders`);
        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders);
        } else {
          console.error("Fehler beim Abrufen der orders");
        }
      } catch (error) {
        console.error("Fehler beim abrufen", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <div className="p-4">
        <h2 className="text-center text-2xl mb-4">Bestellungen</h2>

        {orders.length > 0 ? (
          <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
            <thead className="border-b-2">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th>User ID</th>
                <th>Datum</th>
                <th>Status</th>
                <th>Betrag</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td className="border-b-2 border-r-2 px-2 py-2">
                    {order.order_id}
                  </td>
                  <td className="border-b-2 border-r-2 px-2">
                    {order.user_id}
                  </td>
                  <td className="border-b-2 border-r-2 px-2">
                    {new Intl.DateTimeFormat("de-DE", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(order.ordered_at))}
                  </td>
                  <td
                    className={`border-b-2 border-r-2 px-2 ${
                      order.status === "pending"
                        ? "text-orange-400"
                        : order.status === "delivered"
                        ? "text-green-500"
                        : "text-white"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="border-b-2 px-2">{order.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>error</p>
        )}
      </div>
    </>
  );
};

export default ViewOrders;
