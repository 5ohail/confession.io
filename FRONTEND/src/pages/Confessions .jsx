import React, { useState, useEffect } from "react";
import { useAuth } from "../../utils/Authcontext";
import Card from "../components/Card";

const Confessions = () => {
  const { confessions } = useAuth();
  const [style, setStyle] = useState({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    color: '#777',
    fontWeight: "300",
    fontSize: window.innerWidth > 660 ? "1.2rem" : "1rem"
  });

  useEffect(() => {
    const handleResize = () => {
      setStyle(prev => ({
        ...prev,
        fontSize: window.innerWidth > 660 ? "1.2rem" : "1rem"
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {confessions && typeof confessions === 'object' && Object.values(confessions).length !== 0 ? (
        Object.values(confessions).map((confession, index) => (
          <Card key={index} id={index} confession={confession.confession} />
        ))
      ) : (
        <h1 style={style}> NO CONFESSIONS YET </h1>
      )}
    </div>
  );
};

export default Confessions;
