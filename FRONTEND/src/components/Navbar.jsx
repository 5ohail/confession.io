import React from 'react'
import { NavLink } from 'react-router-dom'
const Styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        margin: '0.7rem 0',
        color: '#000'
    },
    navLogo: {
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        gap: '1rem'
    },
    navLinks: {
        textDecoration: 'none',
        color: '#000',
        padding: '0.5rem 1rem',
        borderRadius: '0.3125rem',
        transition: 'background-color 0.3s',
    },
    navLogin:{
        backgroundColor: '#ff0000',
        color: '#fff',
    }
}
const user = {
    admin: false // This should be replaced with actual user state management
}
const Navbar = () => {
  return (
    <nav style={Styles.nav}>
      <h1 style={Styles.navLogo}>Confession.io</h1>
      <ul style={Styles.navList}>
        <li><NavLink to="/" style={Styles.navLinks}>Home</NavLink></li>
        <li><NavLink to="/confessions" style={Styles.navLinks}>Confessions</NavLink></li>
        {user.admin?<li><NavLink to="/admin" style={Styles.navLinks}>Admin</NavLink></li>: ""}
        <li><NavLink to="/login" style={{...Styles.navLinks, ...Styles.navLogin}}>Login</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar