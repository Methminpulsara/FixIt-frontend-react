import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
});

// හැම Request එකකටම කලින් Token එක තියෙනවාද බලලා Header එකට දානවා
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;