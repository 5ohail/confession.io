import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/Authcontext';

const getResponsiveStyles = () => {
  const isMobile = window.innerWidth <= 768;
  return {
    container: {
      position: "relative",
      height: isMobile? "70vh" :"80vh",
      padding: isMobile ? "1rem" : "2rem",
    },
    greetings: {
      margin: isMobile ? "0.6rem 0.7rem" : "0.6rem 2rem",
      fontWeight: "700",
      fontSize: isMobile ? "1.2rem" : "1.8rem"
    },
    centerBox: {
      position: "absolute",
      top: isMobile?"50%":"45%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      textAlign: "center",
      width: isMobile ? "90%" : "60%",
    },
    centerTxt: {
      fontSize: isMobile ? "1.2rem" : "2.5rem",
    },
    centerBtn: {
      fontSize: isMobile ? "1rem" : "1.2rem",
      marginTop: "1rem",
      backgroundColor: "#ff0000",
      color: "#ffffff",
      border: "none",
      padding: isMobile ? "0.5rem 1rem" : "0.7rem 1.2rem",
      borderRadius: "0.2rem",
      cursor: "pointer"
    },
    inputTxt: {
      height: isMobile ? "30vh" : "50vh",
      width: isMobile ? "80vw" : "50vw",
      marginTop: "1rem",
      padding: "1rem",
      fontSize: "1rem",
      borderRadius: "1.2rem"
    },
    confessBtn: {
      fontSize: isMobile ? "0.8rem" : "1.2rem",
      marginTop: "1rem",
      backgroundColor: "#ff0000",
      color: "#ffffff",
      border: "none",
      padding: isMobile ? "0.5rem 1rem" : "0.7rem 1.6rem",
      borderRadius: "0.2rem",
      cursor: "pointer"
    },
    back: {
      color: "#007bff",
      cursor: "pointer"
    },
    p: {
      marginTop: "1rem"
    }
  };
};

const Home = () => {
  const user = JSON.parse(localStorage.getItem('data')).user;
  const { submitConfession } = useAuth();

  const [confesWin, setConfesWin] = useState(false);
  const [confession, setConfession] = useState('');
  const [styles, setStyles] = useState(getResponsiveStyles());

  const handleConfess = () => {
    submitConfession(confession);
    setConfession('');
    setConfesWin(false);
  };

  useEffect(() => {
    const handleResize = () => setStyles(getResponsiveStyles());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.container}>
      <h3 style={styles.greetings}>Hello {user}👋</h3>
      {!confesWin ? (
        <div style={styles.centerBox}>
          <h1 style={styles.centerTxt}> Want To Confess Something?</h1>
          <button style={styles.centerBtn} onClick={() => setConfesWin(true)}>Confess</button>
        </div>
      ) : (
        <div style={{ ...styles.centerBox, margin: "4rem 0" }}>
          <h1>Confess Here</h1>
          <textarea style={styles.inputTxt} value={confession} onChange={(e) => setConfession(e.target.value)} />
          <button style={styles.confessBtn} onClick={handleConfess}>Submit</button>
          <p style={styles.p}>Back to <span style={styles.back} onClick={() => setConfesWin(false)}>Home</span></p>
        </div>
      )}
    </div>
  );
};

export default Home;
