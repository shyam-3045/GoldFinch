import axios from "axios";

// Create an axios instance with your base URL
const instance = axios.create({
  baseURL: "https://goldfinch-backend.onrender.com",
});

// Interceptor to handle expired token
instance.interceptors.response.use(
  response => response,
  error => {
    // Check if the error is a token expiration error (401)
    if (
      error.response?.status === 401 &&
      error.response.data.message === "TokenExpiredError"
    ) {
      // Token is expired, remove it from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.warn("Token expired, removed from localStorage.");
      
      // Optionally, redirect the user to the login page
      window.location.href = "/"; // or your login URL
    }

    return Promise.reject(error);
  }
);

export default instance;
