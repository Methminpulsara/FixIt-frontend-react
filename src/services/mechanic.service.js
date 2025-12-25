import api from '../api/axiosConfig'


export const  createMechanicProfile = (mechanicData) =>{
    return api.post('/mechanic/profile', mechanicData)
}