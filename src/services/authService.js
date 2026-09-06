import { apiRequest } from './api'

export { saveSession, getSession, clearSession, hasAnyRole } from './session'

export const login = ({ email, password }) =>
    apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })
