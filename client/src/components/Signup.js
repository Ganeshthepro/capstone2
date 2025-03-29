import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/user', {
        name,
        email,
        password
      });


      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.userId,
        name: response.data.name || name,
        email: response.data.email
      }));

      console.log('Signup successful:', response.data);
      setError("");
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err.response || err.message);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(/stockbg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      width: '100vw',
    },
    formContainer: {
      backgroundColor: 'rgba(138, 43, 226, 0)',
      padding: '30px',
      borderRadius: '8px',
      width: '35%',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
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
      color: '#B0B0B0',
    },
    logo: {
      display: 'block',
      margin: '0 auto 20px',
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    welcomeText: {
      color: 'lightgrey',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <img src="/logo.jpg" alt="Investment Insights Logo" style={styles.logo} />
        <h2 style={styles.welcomeText}>Welcome To InvestmentInsights</h2>
        <h3 style={styles.textDarkGrey}>Sign Up</h3>
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
              className="form-control rounded-0"
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
          <Link to="/login" style={styles.linkButton}>Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;