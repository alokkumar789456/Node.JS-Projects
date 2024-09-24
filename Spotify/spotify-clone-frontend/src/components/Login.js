import React from 'react';
import './styles/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <nav className="login-nav">
        <h2>Hmmmmmm!🎧</h2>
      </nav>
      <div className="login-form">
        <h1>Login</h1>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="social-signup">
          <button className="google-button">Sign up with Google</button>
          <button className="facebook-button">Sign up with Facebook</button>
        </div>
        <p className="signup-text">Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
      <footer className="login-footer">
        <p>&copy; 2024 Hmmmmmm! Player by Brain-Phantom</p>
      </footer>
    </div>
  );
};

export default Login;
