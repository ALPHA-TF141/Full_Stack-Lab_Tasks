import React, { useEffect, useState } from 'react';

const OtpVerification = ({ email, onVerified }) => {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpVerificationId, setOtpVerificationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Enter your email, send OTP, then verify before booking.');

  useEffect(() => {
    setEnteredOtp('');
    setOtpVerificationId(null);
    setMessage('Enter your email, send OTP, then verify before booking.');
    onVerified(false, null);
  }, [email, onVerified]);

  const isValidEmail = /\S+@\S+\.\S+/.test(email);

  const sendOtp = async () => {
    if (!isValidEmail) {
      setMessage('Please enter a valid email address in the booking form first.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to send OTP');
      }

      setOtpVerificationId(data.otpVerificationId);
      setEnteredOtp('');
      setMessage(`OTP sent to ${email}. Check your inbox and enter the 6-digit code.`);
      onVerified(false, null);
    } catch (error) {
      setMessage(`OTP send failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otpVerificationId) {
      setMessage('Send an OTP before verification.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp: enteredOtp,
          otpVerificationId
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      setMessage(`Email OTP verified successfully. Verified ID: ${data.otpVerificationId}`);
      onVerified(true, data.otpVerificationId);
    } catch (error) {
      setMessage(`OTP verification failed: ${error.message}`);
      onVerified(false, null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-panel">
      <h2>OTP Verification</h2>
      <p>{message}</p>
      <div className="otp-actions">
        <button type="button" onClick={sendOtp} disabled={isLoading}>Send OTP</button>
        <input
          aria-label="Enter OTP"
          maxLength="6"
          name="otp"
          onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
          placeholder="6-digit OTP"
          value={enteredOtp}
        />
        <button type="button" onClick={verifyOtp} disabled={isLoading}>Verify OTP</button>
      </div>
    </div>
  );
};

export default OtpVerification;
