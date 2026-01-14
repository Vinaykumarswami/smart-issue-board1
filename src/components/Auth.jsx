import { useState } from "react";
import React from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login} className="bg-blue-500 text-white p-2 w-full">
        Login
      </button>
      <button
        onClick={signup}
        className="bg-green-500 text-white p-2 w-full mt-2"
      >
        Signup
      </button>
    </div>
  );
}
