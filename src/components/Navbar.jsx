import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav
      className="sticky top-0 z-50 flex justify-between items-center px-6 py-4
      bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
    >
      <h1
        className="text-xl font-bold tracking-wide cursor-pointer
        hover:scale-105 transition"
        onClick={() => navigate("/")}
      >
        Smart Issue Board
      </h1>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            {user.email}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1.5 rounded-full
            hover:bg-red-600 hover:scale-105 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
