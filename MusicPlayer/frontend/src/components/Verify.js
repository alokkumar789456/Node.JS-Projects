import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Verify.css';

const Verify = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'otp') setOtp(value);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/signup/verify-otp", {
        email,
        otp
      });

      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate('/'); 
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        const { message } = err.response.data;
        setErrorMessage(message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="verify-container">
      <h1>Hmmmmmm! </h1>
      <h2>Verify Your Email</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required value={email} onChange={handleChange} />
        <input type="text" name="otp" placeholder="Enter OTP" required value={otp} onChange={handleChange} />
        <button type="submit" className="verify-button">Verify OTP</button>
      </form>
    </div>
  );
};

export default Verify;
