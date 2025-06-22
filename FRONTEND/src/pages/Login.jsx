import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/Authcontext';

const getResponsiveWidth = () => (window.innerWidth <= 768 ? '80vw' : '30vw');

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
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
      .post(`${import.meta.env.VITE_API_URL}/login`, { username, password })
      .then((response) => {
        if (response.data.success) {
          alert('Login successful');
          login({
            user: response.data.user.username,
            token: response.data.token,
            admin: response.data.isAdmin,
          });
          navigate('/');
        } else {
          alert('Login failed: ' + response.data.message);
        }
      })
      .catch((error) => {
        console.error('There was an error logging in!', error);
        alert('Login failed: ' + error.message);
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
          type="password"
          placeholder="Password"
          style={Styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={Styles.button}>
          Login
        </button>
        <p style={Styles.p}>
          Don't have an account?{' '}
          <Link to="/register" style={Styles.link}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
