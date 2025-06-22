import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [confessions, setConfessions] = useState({});
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("data"));
    if (savedData) {
      setUser(savedData);
    }
  }, []);
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("data", JSON.stringify(userData));
  };
  console.log(user);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("data");
    navigate("/login");
  };
  const fetchConfessionData = async () => {
    const fetchedData = await axios.get(
      `${import.meta.env.VITE_API_URL}/confessions`
    );
    console.log(fetchedData);
    const result = await fetchedData.data;
    setConfessions({ ...result });
  };

  const submitConfession = async (text) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/confessions`, {
        user: user?.user,
        confession: text,
      });
      // clear input after submit
      fetchConfessionData(); // refresh the confession list
    } catch (error) {
      console.error("Error posting confession:", error);
    }
  };
  useEffect(() => {
    fetchConfessionData();
  }, [confessions]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, confessions, submitConfession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
