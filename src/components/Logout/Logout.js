import React from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"; // Add this import
import "./Logout.css";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Update this line to use the new syntax
      navigate("/login");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <div className="logout">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
