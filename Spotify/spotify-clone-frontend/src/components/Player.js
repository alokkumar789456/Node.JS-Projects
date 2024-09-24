// import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faCompass, faCog, faPlay, faPause, faRandom } from '@fortawesome/free-solid-svg-icons';
import './styles/Player.css';

const Player = () => {
  return (
    <div className={`player-container `}>
      <h1>Hmmmmmm! 🎧</h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <FontAwesomeIcon icon={faMusic} />
          </li>
          <li className="nav-item">
            <FontAwesomeIcon icon={faCompass} />
          </li>
          <li className="nav-item">
            <FontAwesomeIcon icon={faCog} />
          </li>
        </ul>
      </nav>
      <div className='mainContainer'>
        <h2>Recently Played</h2>
        <div className="recently-played">
          <div className="track">Track 1</div>
          <div className="track">Track 2</div>
          <div className="track">Track 3</div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-icons">
          <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faPause} />
          <FontAwesomeIcon icon={faRandom} />
        </div>
      </footer>
    </div>
  );
};

export default Player;
