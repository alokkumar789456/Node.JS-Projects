import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faMusic,
  faCompass,
  faCog,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Player = () => {
  const [tracks, setTracks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch("http://localhost:5000/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Logged in with Google:", data);
          navigate("/home"); // Navigate to home after successful login
        })
        .catch((error) => {
          console.error("Error during authentication:", error);
        });
    }

    // Fetch all tracks from the backend
    const fetchTracks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/music");
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, [navigate]);

  const handlePlay = (track) => {
    if (currentTrack === track) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Hmmmmmm! 🎧</h1>
      <nav>
      <ul className="flex space-x-4">
        <li className="nav-item">
          <Link to="/tracks" className="flex items-center">
            <FontAwesomeIcon
              icon={faMusic}
              className="text-gray-700 hover:text-blue-500 transition"
            />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/player" className="flex items-center">
            <FontAwesomeIcon
              icon={faCompass}
              className="text-gray-700 hover:text-blue-500 transition"
            />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/tracks" className="flex items-center">
            <FontAwesomeIcon
              icon={faCog}
              className="text-gray-700 hover:text-blue-500 transition"
            />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/music-library" className="flex items-center">
            <FontAwesomeIcon
              icon={faUserShield}
              className="text-gray-700 hover:text-blue-500 transition"
            />
          </Link>
        </li>
      </ul>
    </nav>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">All Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.length === 0 ? (
            <p className="col-span-3 text-center">No tracks available.</p>
          ) : (
            tracks.map((track) => (
              <div
                className="track bg-gray-50 border border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
                key={track._id}
                onClick={() => handlePlay(track)}
              >
                <img
                  src={`http://localhost:5000/${track.albumArt}`}
                  alt="Album Art"
                  className="album-image w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold">{track.title}</h3>
                <p>
                  <strong>Artist:</strong> {track.artist.name}
                </p>
                <audio controls className="mt-2 w-full">
                  <source
                    src={`http://localhost:5000/${track.audioUrl}`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio tag.
                </audio>
              </div>
            ))
          )}
        </div>
      </div>
      <footer className="mt-6 w-full bg-gray-200 rounded-lg p-4 flex justify-between items-center">
        <div className="footer-info text-gray-700">
          {currentTrack ? (
            <span>
              Now Playing: <strong>{currentTrack.title}</strong> by{" "}
              <strong>{currentTrack.artist.name}</strong>
            </span>
          ) : (
            <span>Select a track to play</span>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Player;
