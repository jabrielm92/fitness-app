import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  return (
    <div className="homepage">
      <h1>Welcome to the Fitness App</h1>
      <p>Please sign up and log in to access your dashboard.</p>
      <p>demo email: myname@gmail.com password: cookies1</p>
      <div className="homepage-links">
        <Link to="/login" className="homepage-link">
          Log in
        </Link>
        <Link to="/signup" className="homepage-link">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
