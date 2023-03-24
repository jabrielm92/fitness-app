import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logout from "../Logout/Logout";
import "./Navigation.css";

function Navigation() {
  const { currentUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const activeClassName = (isActive) => (isActive ? "active" : "");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navigation">
      <button className="mobile-menu-button" onClick={toggleDropdown}>
        &#9776;
      </button>
      <div className={`nav-links ${showDropdown ? "show" : ""}`}>
        {currentUser ? (
          <>
            <NavLink
              to="/"
              end
              className={({ isActive }) => activeClassName(isActive)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => activeClassName(isActive)}
            >
              Profile
            </NavLink>
            <NavLink
              to="/search-exercises"
              className={({ isActive }) => activeClassName(isActive)}
            >
              Search Exercises
            </NavLink>
            <NavLink
              to="/saved-exercises"
              className={({ isActive }) => activeClassName(isActive)}
            >
              Saved Exercises
            </NavLink>
            <NavLink
              to="/workout-plan"
              className={({ isActive }) => activeClassName(isActive)}
            >
              Workout Plan
            </NavLink>
            <NavLink
              to="/progress-tracking"
              className={({ isActive }) => activeClassName(isActive)}
            >
              Progress Tracking
            </NavLink>
            <Logout />
          </>
        ) : (
          <>
            <NavLink
              to="/signup"
              className={({ isActive }) => activeClassName(isActive)}
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => activeClassName(isActive)}
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;


