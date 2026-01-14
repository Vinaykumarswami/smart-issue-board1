import React, { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  };

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 border rounded w-80">
        <h2 className="text-xl font-bold mb-4">Login / Signup</h2>

        <input
          className="border w-full mb-3 p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full mb-3 p-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login} className="bg-blue-500 text-white w-full mb-2 p-2">
          Login
        </button>

        <button onClick={signup} className="bg-green-500 text-white w-full p-2">
          Signup
        </button>
      </div>
    </div>
  );
}
