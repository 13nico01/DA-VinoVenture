import { useEffect, useState } from "react";

const ProfileOverview = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    setUsername(storedUsername);
  }, []);

  return (
    <>
      {username ? (
        <div className="pb-6 pt-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl">
              Welcome back <span className="text-green-600">{username}</span>
            </h1>
          </div>
          <div className="flex flex-col -pt-16"></div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-red-500 text-2xl">Not logged in</h1>
        </div>
      )}
    </>
  );
};

export default ProfileOverview;
