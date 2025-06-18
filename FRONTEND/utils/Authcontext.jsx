import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const login = (userData) => {
        setUser(userData);
        // Optionally, you can save user data to localStorage or sessionStorage
        localStorage.setItem('data', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('data');
        navigate('/login');

    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};