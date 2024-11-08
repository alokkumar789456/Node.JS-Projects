// Login.js
import React, { useState } from 'react';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Email and password are required.');
        } else {
            console.log('Login Successful!', { email, password });
            // Add your login logic here
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="form">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <span className="error">{error}</span>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
