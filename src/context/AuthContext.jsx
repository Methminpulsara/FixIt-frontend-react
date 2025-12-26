import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 💡 අලුතින් එකතු කළ කොටස: Backend එකෙන් අලුත්ම User data ලබාගැනීම
    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            // Backend එකේ ලොග් වෙලා ඉන්න යූසර්ගේ විස්තර දෙන API එකට කෝල් එකක් දෙනවා
            const response = await api.get('/me'); 
            if (response.data) {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        } catch (error) {
            console.error("Auth sync failed:", error);
            // ටෝකන් එක expire වෙලා නම් ලොග් අවුට් කරනවා
            if (error.response?.status === 401) logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    // 💡 අමතක නොකර value එකට checkAuth එක ඇතුළත් කරන්න
    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);