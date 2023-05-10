import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Update the import here
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in", error);
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <p>demo email: myname@gmail.com password: cookies1</p>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;






  