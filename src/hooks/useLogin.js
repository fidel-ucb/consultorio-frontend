import { useState } from 'react'
import { login as loginRequest } from '../services/authService'

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const login = async (credentials) => {
        setIsLoading(true)
        setError(null)
        try {
            return await loginRequest(credentials)
        } catch (err) {
            setError(err.message ?? 'No se pudo iniciar sesión')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}
