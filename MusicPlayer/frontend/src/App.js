import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import Player from './components/Player';
import Verify from './components/Verify.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/player" element={<Player />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </Router>
  );
};

export default App;
