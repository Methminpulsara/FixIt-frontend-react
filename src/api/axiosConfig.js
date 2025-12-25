import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    // මෙන්න මේ line එක දාන්න:
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    
   
    //if pssing formdata type from front end remove HEADER
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;