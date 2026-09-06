import { apiRequest } from './api'

const BASE_PATH = '/api/psychologists'

export const getPsychologists = () => apiRequest(BASE_PATH)

export const getCurrentPsychologist = () => apiRequest(`${BASE_PATH}/me`)
