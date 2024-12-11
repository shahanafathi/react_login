// import React, { useState } from "react";
// import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

// const VerifyCode = () => {
//   const [code, setCode] = useState("");
//   const [email, setEmail] = useState(""); // If you need to collect or display the email
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const auth = getAuth();

//   const handleVerify = async () => {
//     try {
//       // Verify the reset code
//       const verifiedEmail = await verifyPasswordResetCode(auth, code);
//       setEmail(verifiedEmail); // The email associated with the code
//       setMessage("Code verified! You can now reset your password.");
//     } catch (err) {
//       setError("Invalid or expired code. Please try again.");
//     }
//   };

//   const handleResend = () => {
//     setError(""); // Clear previous error
//     setMessage("Please request a new password reset link from the login page.");
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Verify Code</h2>
//       <p>An authentication code has been sent to your email.</p>

//       <input
//         type="text"
//         placeholder="Enter Code"
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         style={styles.input}
//       />
//       <p style={styles.error}>{error}</p>
//       <p style={styles.message}>{message}</p>

//       <button onClick={handleVerify} style={styles.button}>
//         Verify
//       </button>
//       <p>
//         Didn’t receive a code?{" "}
//         <span onClick={handleResend} style={styles.resendLink}>
//           Resend
//         </span>
//       </p>
//     </div>
//   );
// };

// // Styles for simplicity
// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "20px",
//     maxWidth: "400px",
//     margin: "auto",
//   },
//   input: {
//     padding: "10px",
//     fontSize: "16px",
//     width: "100%",
//     margin: "10px 0",
//   },
//   button: {
//     padding: "10px 20px",
//     fontSize: "16px",
//     backgroundColor: "#4A90E2",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//   },
//   resendLink: {
//     color: "red",
//     cursor: "pointer",
//     textDecoration: "underline",
//   },
//   error: {
//     color: "red",
//     fontSize: "14px",
//   },
//   message: {
//     color: "green",
//     fontSize: "14px",
//   },
// };

// export default VerifyCode;


import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useState } from 'react';
import { auth } from './config/firebase';
import "./VerifyCode.css";
const PhoneAuth = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  // Initialize reCAPTCHA
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible', // or 'normal' for a visible reCAPTCHA
        callback: (response) => {
          console.log('reCAPTCHA solved', response);
        },
      },
      auth
    );
  };

  // Send OTP
  const sendOtp = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      console.log('OTP sent');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      console.log('User authenticated:', result.user);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div>
      <div id="recaptcha-container"></div>

      <input
        type="text"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button  onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
};

export default PhoneAuth;

