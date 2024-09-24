import React from 'react';
import './styles/SignUp.css';

const SignUp = () => {
  return (
    <div className="signup-container">
      <nav className="signup-nav">
      <h2>Hmmmmmm! 🎧</h2>
      </nav>
      <div className="signup-form">
        <h1>Sign Up</h1>
        <form action='/signup' method='POST'>
          <input type="text" placeholder="unique userName" required />
          <input type="text" placeholder="Profile Name" required />
          <input type="email" placeholder="Email" required />
          <input type="tel" placeholder="Phone" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
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
