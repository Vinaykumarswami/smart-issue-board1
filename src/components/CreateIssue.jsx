import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase";


export default function CreateIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");

  const createIssue = async () => {
    if (!title || !description) return;

    await addDoc(collection(db, "issues"), {
      title,
      description,
      priority,
      status,
      createdBy: auth.currentUser.uid,
      createdAt: Timestamp.now(),
    });

    setTitle("");
    setDescription("");
    setPriority("Low");
    setStatus("Open");
  };

  return (
    <div
      className="bg-white p-5 rounded-xl shadow-md
      hover:shadow-xl transition-all duration-300 mb-6"
    >
      <h3 className="text-lg font-semibold mb-3">➕ Create Issue</h3>

      <input
        className="border rounded-lg p-2 w-full mb-3
        focus:ring-2 focus:ring-indigo-400 outline-none"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border rounded-lg p-2 w-full mb-3
        focus:ring-2 focus:ring-indigo-400 outline-none"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-3 mb-3">
        <select
          className="border rounded-lg p-2 w-full cursor-pointer"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          className="border rounded-lg p-2 w-full cursor-pointer"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <button
        onClick={createIssue}
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg
        hover:bg-indigo-700 hover:scale-105 transition"
      >
        Add Issue
      </button>
    </div>
  );
}
