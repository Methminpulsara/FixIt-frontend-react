import api from '../api/axiosConfig'

export const getPendingMechanics =()=>{
    return api.get('/admin/mechanics/pending')
}

export const getPendingGarages =()=>{
    return api.get('/admin/garages/pending')
}


export const handleMechanic = (id, action) =>{
    return api.put(`/admin/mechanics/${id}/${action}`)
}

export const handleGarage = (id ,action) =>{
    return api.put(`/admin/garages/${id}/${action}`)
}

