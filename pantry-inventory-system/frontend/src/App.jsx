import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import ItemList from "./components/ItemList";
import { fetchUser } from "./utils/api";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password) => {
    // For demo, skip actual login, just set user with role admin
    setUser({ username, role: "admin" });
  };

  useEffect(() => {
    // In real app, fetch current user role from backend
    fetchUser()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 text-center text-xl font-bold">
        Pantry Inventory System
      </header>
      <ItemList userRole={user.role} />
    </div>
  );
}

export default App;