import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
const Styles = {
    centerDiv:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        padding: '1rem',
        borderRadius: '0.5rem',
    },
    input: {
        marginBottom: '1rem',
        padding: '1rem',
        width:'30vw',
        borderRadius: '0.25rem',
        border: '1px solid #ccc',
    },
    button: {
        backgroundColor: '#007bff',
        padding: '0.8rem',
        width:'30vw',
        color: '#fff',
        borderRadius: '0.25rem',
        border: 'none',
        cursor: 'pointer',
    },
    h1: {
        textAlign: 'center',
        marginBottom: '1rem',
    },
    p:{
      textAlign: 'center',
      marginTop: '1rem',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
}
}
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}/register`, { username, email, password})
            .then(response => {
                if (response.data.success) {
                    alert('Registration successful');
                    // Redirect to home or dashboard
                    navigate('/login');
                } else {
                    alert('Registration failed: ' + response.data.message);
                }
            })
            .catch(error => {
                console.error('There was an error registering!', error);
                alert('Registration failed: ' + error.message);
            });
    }
  return (
    <div style={Styles.centerDiv}>
    <form onSubmit={handleSubmit} style={Styles.form}>
        <h1 style={Styles.h1}>CONFESSION.IO</h1>
       <input type="text" placeholder="Username" style={Styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />
       <input type="email" placeholder="Email" style={Styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
       <input type="password" placeholder="Password" style={Styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
       <button type="submit" style={Styles.button}>Register</button>
       <p style={Styles.p}>Already have an account? <Link to="/login" style={Styles.link}>Login</Link></p>
    </form>
    </div>
  )
}

export default Register