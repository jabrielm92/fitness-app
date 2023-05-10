import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  return (
    <div className="homepage">
      <h1>Welcome to the Fitness App</h1>
      <p>In production stage.</p> 
      <p>To demo, click Login and enter provided credentials.</p>
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
