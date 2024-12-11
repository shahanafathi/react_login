
// import { doc,  setDoc } from "firebase/firestore";
// import { db } from "./config/firebase";
// import React, { useState } from "react";
// import "./Signup.css";



// const Signup = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     agreedToTerms: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.agreedToTerms) {
//       alert("Please agree to the terms and privacy policies.");
//       return;
//     }
//     try {
//       await setDoc(doc(db, "users", userid), {
//           firstName: firstName,
//           lastName: lastName,
//           email: email,
//       });
//   } catch (e) {
//       console.error("Error adding document: ", e);
//   }
//     console.log("Form submitted:", formData);
//     alert("Account created successfully!");
//   };

//   return (
//     <div className="signup-container">
//       <h1>Sign up</h1>
//       <p>Let’s get you all set up so you can access your personal account.</p>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <div className="terms">
//           <input
//             type="checkbox"
//             name="agreedToTerms"
//             checked={formData.agreedToTerms}
//             onChange={handleChange}
//           />
//           <label>
//             I agree to the <span>Terms</span> and <span>Privacy Policies</span>
//           </label>
//         </div>
//         <button type="submit">Create account</button>
//       </form>
//       <p>
//         Already have an account? <a href="/">Login</a>
//       </p>
//     </div>
//   );
// };

// export default Signup;


import { doc, setDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import phone1 from './assets/phone1.png';
import logo from './assets/logo.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    agreedToTerms: false,
  });
const navigte=useNavigate()
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      alert("Please agree to the terms and privacy policies.");
      return;
    }
    try {
      // Generate a unique user ID based on email
      const userId = formData.email.replace(/[^a-zA-Z0-9]/g, '_');

      // Add user data to Firestore
      await setDoc(doc(db, "users", userId), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        createdAt: new Date() 
      });
      navigte('/profile')
      console.log("Form submitted:", formData);
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    
    <div className="signup-container">
     <div className="login-illustration">
        <img src={phone1} alt="Illustration" className="illustration" />
      </div>
      <form onSubmit={handleSubmit}>
      {/* <div className="login-illustration">
        <img src={phone} alt="Illustration" className="illustration" />
      </div> */}
      <h1>Sign up</h1>
      <p>Let's get you all set up so you can access your personal account.</p>
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
            required
          />
          <label>
            I agree to the <span>Terms</span> and <span>Privacy Policies</span>
          </label>
        </div>
       <button type="submit" onClick={handleSubmit}>Create account</button>
       <p>
        Already have an account? <a href="/">Login</a>
      </p>
      </form>
      {/* <p>
        Already have an account? <a href="/">Login</a>
      </p> */}
    </div>
  );
};

export default Signup;