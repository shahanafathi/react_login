import React from "react";
import "./IllustrationPage.css";

const IllustrationPage = () => {
  return (
    <div className="illustration-container">
      <img
        src="/path/to/illustration.png"
        alt="Illustration"
        className="illustration-image"
      />
      <p>Welcome! Get started by signing up or logging in.</p>
    </div>
  );
};

export default IllustrationPage;
