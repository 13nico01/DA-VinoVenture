import { useEffect, useState } from "react";

const ViewUsers = () => {
  const [users, setUsers] = useState([]); // Initialisiere `users` als leeres Array

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user-manager/get-users"
        );
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der User!");
        }
        const data = await response.json();
        // Stelle sicher, dass `data.users` existiert
        if (data && data.users) {
          setUsers(data.users);
        } else {
          console.error("Keine Benutzerdaten vorhanden!");
        }
      } catch (error) {
        console.error("Fehler beim Abrufen: ", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto mt-2">
      <h2 className="text-2xl font-bold text-center mb-4">
        Verfügbare Benutzer
      </h2>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-black border-b-2 border-black">
          <tr>
            <th className="py-2 px-4 border-b border-r">Benutzername</th>
            <th className="py-2 px-4 border-b border-r">E-Mail</th>
            <th className="py-2 px-4 border-b border-r">Rolle</th>
            <th className="py-2 px-4 border-b border-r">Status</th>
            <th className="py-2 px-4 border-b">Geburtsdatum</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.user_id}
                className="hover:bg-gray-400 transition duration-500 border-b border-black text-black"
              >
                <td className="py-2 px-4 border-r border-black">
                  {user.username}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-r border-black">{user.role}</td>
                <td className="py-2 px-4 border-r border-black">
                  {user.status}
                </td>
                <td className="py-2 px-4 border-r border-black">
                  {user.birthdate}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="py-2 px-4 text-center text-red-600 font-bold bg-gray-500"
              >
                Keine Benutzer verfügbar!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
