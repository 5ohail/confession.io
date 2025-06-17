import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = (userData) => {
        setUser(userData);
        // Optionally, you can save user data to localStorage or sessionStorage
        localStorage.setItem('data', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('data');
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