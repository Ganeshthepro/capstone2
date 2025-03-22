import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/user', { 
        name, 
        email, 
        password 
      });
      
      // Store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);
      // Store user details in localStorage
      localStorage.setItem('user', JSON.stringify({
        id: response.data.userId,
        email: response.data.email
      }));
      
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed, please try again.");
    }
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
      color: '#B0B0B0', // Dark grey color
    },
    logo: {
      display: 'block',
      margin: '0 auto 20px', // Center the logo and give margin-bottom
      width: '120px', // Adjust the size of the logo
      height: '120px', // Maintain the height for a square shape
      borderRadius: '50%', // Make the logo circular
      objectFit: 'cover', // Ensure the image fits the circle without distortion
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Add logo above the form */}
        <img src="/logo.jpg" alt="Investment Insights Logo" style={styles.logo} />
        
        {/* Optional: Add a heading if desired */}
        <h2 style={styles.textDarkGrey}>Sign Up</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" style={styles.textDarkGrey}>
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control rounded-0" // Fixed rounded-8 to rounded-0 for consistency
            />
          </div>

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
            Register
          </button>

          <p style={styles.textDarkGrey}>Already Have an Account?</p>
          <Link to="/login" style={styles.linkButton}>
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;