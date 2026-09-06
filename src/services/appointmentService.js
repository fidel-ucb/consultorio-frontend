import { apiRequest } from './api'

const BASE_PATH = '/api/appointments'

export const getAppointments = () => apiRequest(BASE_PATH)

export const getCurrentAppointments = () => apiRequest(`${BASE_PATH}/me`)

export const createAppointment = (appointment) =>
    apiRequest(BASE_PATH, {
        method: 'POST',
        body: JSON.stringify(appointment),
    })

export const updateAppointment = (appointmentId, appointment) =>
    apiRequest(`${BASE_PATH}/${appointmentId}`, {
        method: 'PUT',
        body: JSON.stringify(appointment),
    })

export const deleteAppointment = (appointmentId) =>
    apiRequest(`${BASE_PATH}/${appointmentId}`, {
        method: 'DELETE',
    })

