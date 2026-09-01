import { apiRequest } from './api'

export const login = ({ email, password }) =>
    apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })
