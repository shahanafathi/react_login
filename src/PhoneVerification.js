
// import React, { useState } from "react";
// import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";
// import "./PhoneVerification.css";

// const PhoneVerification = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [verificationId, setVerificationId] = useState(null);
//   const [error, setError] = useState("");

//   const setupRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: () => {
//           console.log("Recaptcha Verified");
//         },
//       },
//       auth
//     );
//   };

//   const requestOtp = () => {
//     setupRecaptcha();
//     const appVerifier = window.recaptchaVerifier;

//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//         setVerificationId(confirmationResult.verificationId);
//         alert("OTP sent to your phone.");
//       })
//       .catch((error) => {
//         setError(error.message);
//       });
//   };

//   const verifyOtp = () => {
//     if (otp === "" || verificationId === null) return;

//     const credential = firebase.auth.PhoneAuthProvider.credential(
//       verificationId,
//       otp
//     );
//     auth
//       .signInWithCredential(credential)
//       .then(() => {
//         alert("Phone number verified successfully!");
//       })
//       .catch((error) => {
//         setError("Invalid OTP. Please try again.");
//       });
//   };

//   return (
//     <div className="phone-verification-container">
//       <div className="form-container">
//         <h2>Login</h2>
//         <p>Login to access your travelwise account</p>
//         {!verificationId ? (
//           <div>
//             <label>
//               Enter mobile number
//               <input
//                 type="text"
//                 placeholder="+1234567890"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//             </label>
//             <button onClick={requestOtp}>Get OTP</button>
//           </div>
//         ) : (
//           <div>
//             <label>
//               Enter OTP
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </label>
//             <button onClick={verifyOtp}>Verify</button>
//           </div>
//         )}
//         {error && <p className="error-message">{error}</p>}
//         <p className="signup-text">
//           Don’t have an account? <a href="/signup">Sign up</a>
//         </p>
//       </div>
//       <div className="image-container">
//         <img
//           src="https://via.placeholder.com/300x400"
//           alt="Verification illustration"
//         />
//       </div>
//       <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default PhoneVerification;


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
