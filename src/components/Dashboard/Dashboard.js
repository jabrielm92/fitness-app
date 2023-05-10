import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Dashboard.css";

function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your fitness app dashboard!</p>
      {currentUser && (
        <div className="dashboard-sections">
          <Link to="/progress-tracking" className="dashboard-section">
            <h2>Progress Tracking</h2>
            <div className="dashboard-text-wrapper">
              <p>Track your workout progress and see your improvements.</p>
            </div>
          </Link>
          <Link to="/workout-plan" className="dashboard-section">
            <h2>Workout Plan</h2>
            <div className="dashboard-text-wrapper">
              <p>Create and manage your custom workout plans.</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
