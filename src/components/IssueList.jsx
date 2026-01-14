import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import React from "react";

export default function IssueList() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "issues"), (snapshot) => {
      setIssues(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  const updateField = async (id, field, value) => {
    await updateDoc(doc(db, "issues", id), {
      [field]: value,
    });
  };

  return (
    <div>
      <h3 className="font-bold mb-3">Issues</h3>

      {issues.map((issue) => (
        <div key={issue.id} className="border p-3 mb-3 rounded">
          <h4 className="font-semibold">{issue.title}</h4>
          <p className="mb-2">{issue.description}</p>

          {/* STATUS */}
          <select
            value={issue.status}
            onChange={(e) =>
              updateField(issue.id, "status", e.target.value)
            }
            className="border rounded-lg px-3 py-1 cursor-pointer 
               hover:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          {/* PRIORITY */}
          <select
            value={issue.priority}
            onChange={(e) =>
              updateField(issue.id, "priority", e.target.value)
            }
          
           className="border rounded-lg px-3 py-1 cursor-pointer 
           hover:border-indigo-400 focus:ring-2 focus:ring-indigo-300 transition"
          >

          
            <option >Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      ))}
    </div>
  );
}
