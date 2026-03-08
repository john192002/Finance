import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
    // 1. Initialize state by checking if a token already exists
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // 2. If token exists, tell Axios to use it for every request
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
    };

    return { isAuthenticated, login, logout };
};