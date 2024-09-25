import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter and one special character."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate("/verify");
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
      <nav className="mb-6">
        <h2 className="text-3xl font-bold">Hmmmmmm! 🎧</h2>
      </nav>
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Unique Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="text"
            name="name"
            placeholder="Profile Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
      <footer className="mt-6">
        <p className="text-gray-600 text-sm">
          &copy; 2024 Hmmmmmm! Player by Brain-Phantom
        </p>
      </footer>
    </div>
  );
};

export default SignUp;
