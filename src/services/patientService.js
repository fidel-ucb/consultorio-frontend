import { apiRequest } from './api'

const BASE_PATH = '/api/patients'

export const getPatients = () => apiRequest(BASE_PATH)

export const createPatient = (patient) =>
    apiRequest(BASE_PATH, {
        method: 'POST',
        body: JSON.stringify(patient),
    })

export const updatePatient = (id, patient) =>
    apiRequest(`${BASE_PATH}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...patient, id }),
    })

export const deletePatient = (id) =>
    apiRequest(`${BASE_PATH}/${id}`, {
        method: 'DELETE',
    })
