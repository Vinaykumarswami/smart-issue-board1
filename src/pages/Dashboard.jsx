import CreateIssue from "../components/CreateIssue";
import IssueList from "../components/IssueList";
import React from "react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <CreateIssue />
      <IssueList />
    </div>
  );
}
