import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);

        // Store the token in local storage or cookie
        localStorage.setItem('token', data.token);

        navigate("/player"); // Redirect to player page
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message || response.statusText);
        setErrorMessage(errorData.message || "Login failed. Please try again."); // Set error message to state
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error. Please try again later."); // Set network error message
    }
  }

  const googleSubmit = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="login-container">
      <nav className="login-nav">
        <h2>Hmmmmmm!🎧</h2>
      </nav>
      <div className="login-form">
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="social-signup">
          <button className="google-button" onClick={googleSubmit}>Sign up with Google</button>
        </div>
        <p className="signup-text">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
      <footer className="login-footer">
        <p>&copy; 2024 Hmmmmmm! Player by Brain-Phantom</p>
      </footer>
    </div>
  );
};

export default Login;
