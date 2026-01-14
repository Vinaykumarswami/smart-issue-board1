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
    try {
      await signOut(auth);
      navigate("/login"); // ✅ redirect to login after logout
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav
      className="sticky top-0 z-50 flex justify-between items-center px-6 py-4
      bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
    >
      <h1
        className="text-xl font-bold tracking-wide cursor-pointer hover:scale-105 transition"
        onClick={() => navigate("/")}
      >
        Smart Issue Board
      </h1>

      {/* NOT LOGGED IN */}
      {!user && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white/20 px-4 py-1.5 rounded-full
            hover:bg-white/30 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-green-500 px-4 py-1.5 rounded-full
            hover:bg-green-600 transition"
          >
            Register
          </button>
        </div>
      )}

      {/* LOGGED IN */}
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            {user.email}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1.5 rounded-full
            hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
