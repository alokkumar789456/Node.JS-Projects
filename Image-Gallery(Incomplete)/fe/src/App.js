import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Use Routes instead of Switch
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes> {/* Changed from Switch to Routes */}
                    <Route path="/register" element={<Register />} /> {/* Use element prop */}
                    <Route path="/login" element={<Login />} /> {/* Use element prop */}
                    <Route path="/" element={
                        <div>
                            <h1>Welcome to ImageGallery</h1>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </div>
                    } /> {/* Use element prop */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
