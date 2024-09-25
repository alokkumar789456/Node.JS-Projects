// components/MusicLibrary.js
import React, { useState } from "react";
import axios from "axios";

const MusicLibrary = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [albumArt, setAlbumArt] = useState(null);
  const [track, setTrack] = useState({
    title: "",
    artistName: "",
    artistBio: "",
    album: "",
    genre: "",
    releaseYear: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    // Simple validation
    if (!audioFile) {
      setMessage("Please upload an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("albumArt", albumArt); // Append album art if needed
    formData.append("title", track.title);
    formData.append("artistName", track.artistName);
    formData.append("artistBio", track.artistBio);
    formData.append("album", track.album);
    formData.append("genre", track.genre);
    formData.append("releaseYear", track.releaseYear);

    try {
      await axios.post("http://localhost:5000/api/music", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Track uploaded successfully!");
      // Reset form
      setTrack({
        title: "",
        artistName: "",
        artistBio: "",
        album: "",
        genre: "",
        releaseYear: "",
      });
      setAudioFile(null);
      setAlbumArt(null);
    } catch (error) {
      console.error("Error uploading track:", error);
      setMessage("Error uploading track. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload a Track 🎧</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Track Title"
          onChange={(e) => setTrack({ ...track, title: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Artist Name"
          onChange={(e) => setTrack({ ...track, artistName: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <textarea
          placeholder="Artist Bio"
          onChange={(e) => setTrack({ ...track, artistBio: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Album"
          onChange={(e) => setTrack({ ...track, album: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Genre"
          onChange={(e) => setTrack({ ...track, genre: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Release Year"
          onChange={(e) => setTrack({ ...track, releaseYear: e.target.value })}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
          required
          className="w-full p-2 border border-gray-300 rounded bg-gray-50"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAlbumArt(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded bg-gray-50"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Upload Track
        </button>
      </form>
    </div>
  );
};

export default MusicLibrary;
