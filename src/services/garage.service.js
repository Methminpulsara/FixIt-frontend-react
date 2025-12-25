import api from '../api/axiosConfig'

export const createGarageProfile =(garageData)=>{
    return api.post('/garage/profile', garageData);
}