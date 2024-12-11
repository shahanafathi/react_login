import React, { useState } from "react";
import "./SignupPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      alert("You must agree to the Terms and Privacy Policies!");
      return;
    }
    alert("Account created successfully!");
    console.log(formData);
  };

  return (
    <div className="signup-container">
      <h1>Sign up</h1>
      <p>Let’s get you all set up so you can access your personal account.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="terms">
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
          />
          <label>
            I agree to all the <span>Terms</span> and <span>Privacy Policies</span>
          </label>
        </div>
        <button type="submit">Create account</button>
      </form>
      <p>
        Already have an account? <span className="login-link">Login</span>
      </p>
    </div>
  );
};

export default SignupPage;
