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
  },
  inputTxt:{
    height: "50vh",
    width: "50vw",
    marginTop: "1rem",
    padding: "1rem",
    fontSize: "1rem",
    borderRadius: "1.2rem"
    
  },
   confessBtn : {
    fontSize: "1.2rem",
    marginTop: "1rem",
    backgroundColor: "#ff0000",
    color: "#ffffff",
    border: "none",
    padding: "0.7rem 1.6rem",
    borderRadius: "0.2rem",
    cursor: "pointer"
  },
  back:{
    color:"#007bff",
    cursor: "pointer"
  },
  p:{
    marginTop: "1rem"
  }
  
}
const Home = () => {
  const user = JSON.parse(localStorage.getItem('data')).user;
  const [confesWin,setConfesWin] = useState(false);
  const [confession, setConfession] = useState('');
  return (
    <>
    <div style={Styles.container}>
      <h3 style={Styles.greetings}>Hello {user}👋</h3>
      {!confesWin?<div style={Styles.centerBox}>
      <h1 style={Styles.centerTxt}> Want To Confess Something?</h1>
      <button style={Styles.centerBtn} onClick={()=>setConfesWin(true)}>Confess</ button>
      </div>:
      <div style={{...Styles.centerBox,margin:"4rem 0"}}>
      <h1>Confess Here</h1>
      <textarea style={Styles.inputTxt} value={confession} onChange={(e)=>setConfession(e.target.value)}></textarea>
      <button style={Styles.confessBtn}>Submit</button>
      <p style={Styles.p}>Back to <span style={Styles.back} onClick={()=> setConfesWin(false)}>Home</span></p>
    </div>}
    </div>
    
    </>
  )
}

export default Home