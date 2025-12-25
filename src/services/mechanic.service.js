import api from '../api/axiosConfig'


export const  createMechanicProfile = (mechanicData) =>{
    return api.post('/mechanic/profile', mechanicData)
}

export const uploadMechanicDocument = (formData) => {
    return api.post('/mechanic/upload-doc', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};