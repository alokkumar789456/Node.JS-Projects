import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);

        // Store the token in local storage or cookie
        localStorage.setItem("token", data.token);

        navigate("/player"); // Redirect to player page
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message || response.statusText);
        setErrorMessage(errorData.message || "Login failed. Please try again."); // Set error message to state
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error. Please try again later."); // Set network error message
    }
  }

  const googleSubmit = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <nav className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Hmmmmmm!🎧</h2>
      </nav>
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}{" "}
        {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="my-4">
          <button
            className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition duration-200"
            onClick={googleSubmit}
          >
            Sign up with Google
          </button>
        </div>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
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

export default Login;
