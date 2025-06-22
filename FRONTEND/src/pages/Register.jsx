import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const getResponsiveWidth = () => (window.innerWidth <= 768 ? '80vw' : '30vw');

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [formWidth, setFormWidth] = useState(getResponsiveWidth());

  useEffect(() => {
    const handleResize = () => setFormWidth(getResponsiveWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Styles = {
    centerDiv: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      padding: '1rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      width: formWidth,
    },
    input: {
      marginBottom: '1rem',
      padding: '1rem',
      borderRadius: '0.25rem',
      border: '1px solid #ccc',
      fontSize: '1rem',
    },
    button: {
      backgroundColor: '#007bff',
      padding: '0.8rem',
      color: '#fff',
      borderRadius: '0.25rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      marginTop: '0.5rem',
    },
    h1: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      fontSize: '1.5rem',
    },
    p: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.9rem',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/register`, { username, email, password })
      .then((response) => {
        if (response.data.success) {
          alert('Registration successful');
          navigate('/login');
        } else {
          alert('Registration failed: ' + response.data.message);
        }
      })
      .catch((error) => {
        console.error('There was an error registering!', error);
        alert('Registration failed: ' + error.message);
      });
  };

  return (
    <div style={Styles.centerDiv}>
      <form onSubmit={handleSubmit} style={Styles.form}>
        <h1 style={Styles.h1}>CONFESSION.IO</h1>
        <input
          type="text"
          placeholder="Username"
          style={Styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          style={Styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={Styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={Styles.button}>
          Register
        </button>
        <p style={Styles.p}>
          Already have an account?{' '}
          <Link to="/login" style={Styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
