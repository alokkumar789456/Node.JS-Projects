import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SignUp.css';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage('');
    setSuccessMessage('');
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrorMessage("Password must contain at least one uppercase letter and one special character.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate("/verify");
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
    <div className="signup-container">
      <nav className="signup-nav">
        <h2>Hmmmmmm! 🎧</h2>
      </nav>
      <div className="signup-form">
        <h1>Sign Up</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Unique Username" required value={formData.username} onChange={handleChange} />
          <input type="text" name="name" placeholder="Profile Name" required value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone" required value={formData.phone} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={handleChange} />
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="login-text">Already have an account? <a href="/">Login</a></p>
      </div>
      <footer className="signup-footer">
        <p>&copy; 2024 Hmmmmmm! Player by Brain-Phantom</p>
      </footer>
    </div>
  );
};

export default SignUp;
