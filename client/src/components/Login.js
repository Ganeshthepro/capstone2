import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle error messages
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/login', { email, password })
      .then((result) => {
        console.log(result);
        navigate('/dashboard'); // Navigate to dashboard after successful login
      })
      .catch((err) => {
        console.log(err);
        setError("Login failed, please check your credentials."); // Show error message
      });
  };

  // Inline styles for the component
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(/stockbg.jpg)', // Reference the image from the public folder
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    },
    formContainer: {
      backgroundColor: 'rgba(138, 43, 226, 0)', // Transparent light blue background
      padding: '30px',
      borderRadius: '8px',
      width: '35%', // Increased width of the form
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)', // Dark box shadow
    },
    button: {
      width: '100%',
      borderRadius: '0',
    },
    linkButton: {
      width: '100%',
      backgroundColor: 'lightgrey',
      textDecoration: 'none',
      padding: '10px',
      display: 'inline-block',
      textAlign: 'center',
      borderRadius: '0',
    },
    textDarkGrey: {
      color: '#B0B0B0', // Dark grey color for other texts
    },
    logo: {
      display: 'block',
      margin: '0 auto 20px', // Center the logo and give margin-bottom
      width: '120px', // Adjust the size of the logo
      height: '120px', // Maintain the height for a square shape
      borderRadius: '50%', // Make the logo circular
      objectFit: 'cover', // Ensure the image fits the circle without distortion
    },
    welcomeText: {
      color: 'lightgrey', // Light grey color for the title
      fontWeight: 'bold', // Make the title bold
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Add logo above the title */}
        <img src="/logo.jpg" alt="Investment Insights Logo" style={styles.logo} />
        
        <h2 style={styles.welcomeText}>Welcome To InvestmentInsights</h2> {/* Set color to light grey and bold */}
        {error && <div className="alert alert-danger">{error}</div>} {/* Show error message if exists */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" style={styles.textDarkGrey}>
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control rounded-0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" style={styles.textDarkGrey}>
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control rounded-0"
            />
          </div>

          <button type="submit" className="btn btn-success" style={styles.button}>
            Login
          </button>

          <p style={styles.textDarkGrey}>Don't Have an Account?</p> {/* Set color to dark grey */}
          <Link to="/signup" style={styles.linkButton}>
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
