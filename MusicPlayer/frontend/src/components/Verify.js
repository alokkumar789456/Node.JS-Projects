import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "otp") setOtp(value);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup/verify-otp",
        {
          email,
          otp,
        }
      );

      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        const { message } = err.response.data;
        setErrorMessage(message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Hmmmmmm! 🎧</h1>
      <h2 className="text-2xl mb-6">Verify Your Email</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-md"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          required
          value={otp}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default Verify;
