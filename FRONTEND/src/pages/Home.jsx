import React, { useState } from 'react'
const Styles = {
  container:{
    position: "relative",
    height:"80vh"
  },
  greetings :{
    margin: "0.6rem 2rem",
    fontWeight : "700",
    fontSize: "1.8rem"
  },
  centerBox:{
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
  },
  centerTxt:{
    fontSize: "2.5rem",
  },
  centerBtn : {
    fontSize: "1.2rem",
    marginTop: "1rem",
    backgroundColor: "#ff0000",
    color: "#ffffff",
    border: "none",
    padding: "0.7rem 1.2rem",
    borderRadius: "0.2rem",
    cursor: "pointer"
    
    
  }
  
}
const Home = () => {
  const user = JSON.parse(localStorage.getItem('data')).user;
  const [confesWin,setConfesWin] = useState(false);
  return (
    <div style={Styles.container}>
      <h3 style={Styles.greetings}>Hello {user}👋</h3>
      <div style={Styles.centerBox}>
      <h1 style={Styles.centerTxt}> Want To Confess Something?</h1>
      <button style={Styles.centerBtn} onClick={()=>setConfesWin(true)}>Confess</ button>
      </div>
    </div>
  )
}

export default Home