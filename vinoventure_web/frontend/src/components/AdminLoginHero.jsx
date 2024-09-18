function AdminLoginHero({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  error,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-black shadow-md rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <input
          type="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-green-600 to-green-900 hover-bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLoginHero;
