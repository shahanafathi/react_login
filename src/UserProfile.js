import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import './UserProfile.css';
import logo from './assets/logo.png';
const UserProfile = () => {
  const [user, setUser] = useState({ firstName: "", lastName: ""});
  const auth = getAuth();

  useEffect(() => {
    // Fetch user details from Firebase auth or your database
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        firstName: currentUser.displayName?.split(" ")[0] || "Guest",
        lastName: currentUser.displayName?.split(" ")[1] || "",
      });
    }
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      window.location.href = "/login"; // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div className="logo">
      <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2 style={styles.nameText}>{`${user.firstName} ${user.lastName}`}</h2>
      <button onClick={handleLogout} style={styles.button}>
        Log Out
      </button>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fff",
  },
  nameText: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#000",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: " #6c63ff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width:"30%"
  },
  
};

export default UserProfile;


