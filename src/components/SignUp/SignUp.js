import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"; // Add signOut import
import "./SignUp.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Update this line
      await signOut(auth); // Add this line to sign the user out after signing up
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <div className="signup">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} autocomplete="off">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;






