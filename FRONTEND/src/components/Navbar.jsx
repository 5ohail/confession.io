import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../utils/Authcontext';

const baseLinkStyle = {
  textDecoration: 'none',
  color: '#000',
  padding: '0.5rem 1rem',
  borderRadius: '0.3125rem',
  transition: 'background-color 0.3s',
};

const Styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    margin: '0.5rem 0',
    color: '#000',
    position: 'relative',
    zIndex: 1000,
  },
  navLogo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  mobileLogo:{
    fontSize: "0.9rem",
    fontWeight: "bold"
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  navLogin: {
    backgroundColor: '#ff0000',
    color: '#fff',
  },
  navLogout: {
    outline: 'none',
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    display: 'inline-block',
    transform: 'translate(0,-0.4rem)',
  },
  mobileButton: {
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #000',
    padding: '0.4rem 0.6rem',
    margin:"0 0.6rem",
    borderRadius: '0.3125rem',
    cursor: 'pointer',
  },
  line: {
    width: '95vw',
    height: '1px',
    backgroundColor: '#00000022',
    margin: '0 1.3rem',
  },
  hamburger: {
    width: '30px',
    height: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    zIndex: 1001,
  },
  bar: {
    height: '3px',
    width: '24px',
    backgroundColor: '#000',
    borderRadius: '5px',
    transition: '0.4s',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: '60%',
    backgroundColor: '#fff',
    padding: '1rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    flexDirection: 'column',
    gap: '1rem',
    display: 'none',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 999,
    listStyle: 'none',
  },
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const admin = user?.admin;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = (
    <>
      <li><NavLink to="/" style={baseLinkStyle}>Home</NavLink></li>
      <li><NavLink to="/confessions" style={baseLinkStyle}>Confessions</NavLink></li>
      {admin && (
        <li><NavLink to="/admin" style={baseLinkStyle}>Admin</NavLink></li>
      )}
      {user ? (
        <li>
          <button
            style={isMobile ? Styles.mobileButton : Styles.navLogout}
            onClick={logout}
          >
            Logout
          </button>
        </li>
      ) : (
        <li>
          <NavLink
            to="/login"
            style={isMobile
              ? { ...baseLinkStyle, ...Styles.mobileButton }
              : { ...baseLinkStyle, ...Styles.navLogin }}
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <>
      <nav style={Styles.nav}>
        <h1 style={isMobile?Styles.mobileLogo:Styles.navLogo}>Confession.io</h1>

        {isMobile ? (
          <>
            <div style={Styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
              <div style={{
                ...Styles.bar,
                transform: menuOpen ? 'rotate(45deg) translate(8px, 8px)' : 'none'
              }} />
              <div style={{
                ...Styles.bar,
                opacity: menuOpen ? 0 : 1
              }} />
              <div style={{
                ...Styles.bar,
                transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'
              }} />
            </div>
            <ul
              style={{
                ...Styles.mobileMenu,
                display: menuOpen ? 'flex' : 'none',
              }}
            >
              {navLinks}
            </ul>
          </>
        ) : (
          <ul style={Styles.navList}>{navLinks}</ul>
        )}
      </nav>
      <div style={Styles.line}></div>
    </>
  );
};

export default Navbar;
