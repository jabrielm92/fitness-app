import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Profile.css";

function Profile() {
  const { currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <p>Email: {currentUser ? currentUser.email : "Loading..."}</p>
      {/* Display additional user information here */}
      <div className="profileContent">
        {showForm ? (
          <form className="userForm" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={userData.age}
              onChange={(e) => setUserData({ ...userData, age: e.target.value })}
            />
            <label htmlFor="height">Height:</label>
            <input
              type="text"
              id="height"
              value={userData.height}
              onChange={(e) => setUserData({ ...userData, height: e.target.value })}
            />
            <label htmlFor="weight">Weight:</label>
            <input
              type="text"
              id="weight"
              value={userData.weight}
              onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <button className="editProfileButton" onClick={() => setShowForm(true)}>
          Edit Profile Info
        </button>
        )}
      </div>
      {!showForm && (
        <div className="userData">
          <p>Name: {userData.name}</p>
          <p>Age: {userData.age}</p>
          <p>Height: {userData.height}</p>
          <p>Weight: {userData.weight}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;

