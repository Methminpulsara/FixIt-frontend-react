import axios from 'axios'

const api = axios.create({
    baseURL:"https://localhost/5000/api/v1/",
})


export const loginUser = (credentials) =>{
    return api.post('/loging' , credentials);
}