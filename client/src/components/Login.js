import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle error messages
  const navigate = useNavigate(); // For redirection after login

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Post request to your API endpoint
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        // Assuming successful login, redirect to the home page or dashboard
        navigate("/home"); // Redirect to Home page
      })
      .catch((err) => {
        console.log(err);
        // Handle errors (e.g., show an alert or set error state)
        setError("Invalid credentials, please try again."); // Set error message
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Show error message if exists */}
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              value={email} // Bind value to state
              onChange={(e) => setEmail(e.target.value)} // Update state on change
              className="form-control rounded-0"
            />
          </div>

          {/* Password input */}
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password} // Bind value to state
              onChange={(e) => setPassword(e.target.value)} // Update state on change
              className="form-control rounded-0"
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>

          {/* Signup redirect */}
          <p>Don't Have an Account?</p>
          <Link
            to="/signup" // Link to signup page
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Signup
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
