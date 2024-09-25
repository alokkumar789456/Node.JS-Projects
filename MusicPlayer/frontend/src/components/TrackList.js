// components/TrackList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const TrackList = () => {
  const [tracks, setTracks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/music");
        setTracks(response.data);
        if (response.data.length === 0) {
          setMessage("No tracks available.");
        } else {
          setMessage("");
        }
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setMessage("Error fetching tracks. Please try again later.");
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Track List 🎶</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {tracks.length === 0 ? (
        <p className="text-gray-500">No tracks available.</p>
      ) : (
        tracks.map((track) => (
          <div
            className="bg-white rounded-lg shadow-md p-4 mb-4"
            key={track._id}
          >
            <h3 className="text-xl font-semibold">{track.title}</h3>
            <p>
              <strong>Artist:</strong> {track.artist.name}
            </p>
            <p>
              <strong>Bio:</strong> {track.artist.bio}
            </p>
            <p>
              <strong>Album:</strong> {track.album}
            </p>
            <p>
              <strong>Genre:</strong> {track.genre}
            </p>
            <p>
              <strong>Release Year:</strong> {track.releaseYear}
            </p>
            <audio controls className="mt-2 w-full">
              <source
                src={`http://localhost:5000/${track.audioUrl}`}
                type="audio/mpeg"
              />
              Your browser does not support the audio tag.
            </audio>
            {track.albumArt && (
              <img
                src={`http://localhost:5000/${track.albumArt}`}
                alt="Album Art"
                className="mt-2 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TrackList;
