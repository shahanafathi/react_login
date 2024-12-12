import React, { useState, useEffect } from 'react';
import { 
  getAuth, 
  PhoneAuthProvider, 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from 'firebase/auth';
import { auth } from './config/firebase'; 
import './Login.css';
import phone from './assets/phone.png';
import logo from './assets/logo.png';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [error, setError] = useState('');

 
  const validatePhoneNumber = (phoneNumber) => {
    
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phoneNumber);
  };
  

  
  const setupRecaptchaVerifier = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
         
          handleSendOtp();
        },
        'expired-callback': () => {
          setError('reCAPTCHA expired. Please try again.');
        }
      });
    }
  };

  const handleSendOtp = async () => {
    setError('');

    if (!mobileNumber || !validatePhoneNumber(mobileNumber)) {
      setError('Please enter a valid mobile number');
      return;
    }

    try {
      setupRecaptchaVerifier();

     
      const phoneNumber = mobileNumber.startsWith('+') 
        ? mobileNumber 
        : `+91${mobileNumber.replace(/\D/g,'')}`;

     

      const confirmationResult = await signInWithPhoneNumber(
        auth, 
        phoneNumber, 
        window.recaptchaVerifier
      );

     
      setVerificationId(confirmationResult.verificationId);
      setOtpSent(true);
      setError(''); // Clear any previous errors
      console.log('OTP sent successfully to:', phoneNumber);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError(`Failed to send OTP: ${error.message}`);
    }
  };

  
  const handleVerifyOtp = async () => {
   
    setError('');

    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    try {
     
      if (process.env.NODE_ENV === 'test') {
        console.log('Test OTP verified successfully');
        alert('Login successful (Test Mode)!');
        return;
      }

      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithPhoneNumber(auth, credential);
      
      console.log('User authenticated successfully');
      alert('Login successful!');
     
    } catch (error) {
      console.error('Error verifying OTP:', error);
      
      
      switch (error.code) {
        case 'auth/invalid-verification-code':
          setError('Invalid OTP. Please check and try again.');
          break;
        case 'auth/code-expired':
          setError('OTP has expired. Please request a new one.');
          break;
        default:
          setError('Failed to verify OTP. Please try again.');
      }
    }
  };

  
  const handleReset = () => {
    setOtpSent(false);
    setOtp('');
    setVerificationId('');
    setError('');
  };

  return (
    <div className="login-container">
      
      <div id="recaptcha-container"></div>

      <div className="login-form">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Login</h2>
        <p>Login to access your TravelWise account</p>

        {error && (
          <div 
            style={{ 
              color: 'red', 
              marginBottom: '10px', 
              textAlign: 'center' 
            }}
          >
            {error}
          </div>
        )}

        {!otpSent ? (
          <>
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <button 
              style={{ background: '#515DEF' }} 
              onClick={handleSendOtp}
            >
              Get OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button 
              style={{ background: '#515DEF' }} 
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
           
          </>
        )}

        <p>
          <span style={{ marginLeft: '90px' }}>
            Don't have an account?{' '}
            <a href="/signup">
              <span style={{ color: 'red' }}>Sign up</span>
            </a>
          </span>
        </p>
      </div>

      <div className="login-illustration">
        <img src={phone} alt="Illustration" className="illustration" />
      </div>
    </div>
  );
};

export default Login;







// import React, { useState, useEffect } from 'react';
// import { 
//   getAuth, 
//   PhoneAuthProvider, 
//   RecaptchaVerifier, 
//   signInWithPhoneNumber,
//   signInWithCredential 
// } from 'firebase/auth';
// import { auth } from './config/firebase'; // Import your Firebase auth configuration
// import './Login.css';
// import phone from './assets/phone.png';
// import logo from './assets/logo.png';

// const Login = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [verificationId, setVerificationId] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Validate phone number format (more robust validation)
//   const validatePhoneNumber = (phoneNumber) => {
//     // Supports international formats including +1, +91, etc.
//     const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
//     return phoneRegex.test(phoneNumber.replace(/\s+/g, ''));
//   };

//   // Setup Recaptcha Verifier (moved outside of send OTP function)
//   useEffect(() => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//         'size': 'invisible',
//         'callback': (response) => {
//           // reCAPTCHA solved, allow signInWithPhoneNumber.
//           handleSendOtp();
//         },
//         'expired-callback': () => {
//           // Response expired. Ask user to solve reCAPTCHA again.
//           setError('reCAPTCHA expired. Please try again.');
//           setLoading(false);
//         }
//       });
//     }

//     // Cleanup to prevent memory leaks
//     return () => {
//       if (window.recaptchaVerifier) {
//         window.recaptchaVerifier.clear();
//       }
//     };
//   }, []);

//   // Send OTP 
//   const handleSendOtp = async () => {
//     // Reset previous errors and set loading
//     setError('');
//     setLoading(true);

//     // Validate phone number
//     if (!mobileNumber || !validatePhoneNumber(mobileNumber)) {
//       setError('Please enter a valid mobile number');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Ensure phone number is in E.164 format
//       const phoneNumber = mobileNumber.startsWith('+') 
//         ? mobileNumber 
//         : `+91${mobileNumber.replace(/\D/g,'')}`;

//       // Send OTP
//       const confirmationResult = await signInWithPhoneNumber(
//         auth, 
//         phoneNumber, 
//         window.recaptchaVerifier
//       );

//       // Save verification ID
//       setVerificationId(confirmationResult.verificationId);
//       setOtpSent(true);
//       setError(''); // Clear any previous errors
//       setLoading(false);
//       console.log('OTP sent successfully to:', phoneNumber);
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       setError(`Failed to send OTP: ${error.message}`);
//       setLoading(false);
//     }
//   };

//   // Verify OTP
//   const handleVerifyOtp = async () => {
//     // Reset previous errors and set loading
//     setError('');
//     setLoading(true);

//     if (!otp) {
//       setError('Please enter the OTP');
//       setLoading(false);
//       return;
//     }

//     try {
//       // For testing environment
//       if (process.env.NODE_ENV === 'test' && otp === '123456') {
//         console.log('Test OTP verified successfully');
//         alert('Login successful (Test Mode)!');
//         setLoading(false);
//         return;
//       }

//       // Create phone credential
//       const credential = PhoneAuthProvider.credential(verificationId, otp);
      
//       // Sign in with the credential
//       const userCredential = await signInWithCredential(auth, credential);
      
//       console.log('User authenticated successfully', userCredential.user);
//       alert('Login successful!');
//       setLoading(false);
//       // Redirect or handle post-login actions
//       // Example: history.push('/dashboard');
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
      
//       // Specific error handling
//       switch (error.code) {
//         case 'auth/invalid-verification-code':
//           setError('Invalid OTP. Please check and try again.');
//           break;
//         case 'auth/code-expired':
//           setError('OTP has expired. Please request a new one.');
//           break;
//         default:
//           setError('Failed to verify OTP. Please try again.');
//       }
//       setLoading(false);
//     }
//   };

//   // Reset OTP flow
//   const handleReset = () => {
//     setOtpSent(false);
//     setOtp('');
//     setVerificationId('');
//     setError('');
//     setLoading(false);
//   };

//   return (
//     <div className="login-container">
//       {/* Recaptcha container (hidden) */}
//       <div id="recaptcha-container"></div>

//       <div className="login-form">
//         <img src={logo} alt="Logo" className="logo" />
//         <h2>Login</h2>
//         <p>Login to access your TravelWise account</p>

//         {/* Error Message */}
//         {error && (
//           <div 
//             style={{ 
//               color: 'red', 
//               marginBottom: '10px', 
//               textAlign: 'center' 
//             }}
//           >
//             {error}
//           </div>
//         )}

//         {/* Conditional rendering for login and OTP verification */}
//         {!otpSent ? (
//           <>
//             <input
//               type="tel"
//               placeholder="Enter mobile number"
//               value={mobileNumber}
//               onChange={(e) => setMobileNumber(e.target.value)}
//               disabled={loading}
//             />
//             <button 
//               style={{ 
//                 background: loading ? '#A9A9A9' : '#515DEF',
//                 cursor: loading ? 'not-allowed' : 'pointer'
//               }} 
//               onClick={handleSendOtp}
//               disabled={loading}
//             >
//               {loading ? 'Sending...' : 'Get OTP'}
//             </button>
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               disabled={loading}
//             />
//             <button 
//               style={{ 
//                 background: loading ? '#A9A9A9' : '#515DEF',
//                 cursor: loading ? 'not-allowed' : 'pointer'
//               }} 
//               onClick={handleVerifyOtp}
//               disabled={loading}
//             >
//               {loading ? 'Verifying...' : 'Verify OTP'}
//             </button>
//             <button 
//               style={{ 
//                 background: '#FF6347', 
//                 marginTop: '10px',
//                 color: 'white',
//                 cursor: loading ? 'not-allowed' : 'pointer'
//               }} 
//               onClick={handleReset}
//               disabled={loading}
//             >
//               Reset
//             </button>
//           </>
//         )}

//         <p>
//           <span style={{ marginLeft: '90px' }}>
//             Don't have an account?{' '}
//             <a href="/signup">
//               <span style={{ color: 'red' }}>Sign up</span>
//             </a>
//           </span>
//         </p>
//       </div>

//       <div className="login-illustration">
//         <img src={phone} alt="Illustration" className="illustration" />
//       </div>
//     </div>
//   );
// };

// export default Login;