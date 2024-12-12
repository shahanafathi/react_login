
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useState } from 'react';
import { auth } from './config/firebase';
import "./VerifyCode.css";
const PhoneAuth = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
   
  
 
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible', 
        callback: (response) => {
          console.log('reCAPTCHA solved', response);
        },
      },
      auth
    );
  };

  
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

