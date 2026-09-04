import { useState } from 'react'
import { login as loginRequest, saveSession } from '../services/authService'

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const login = async (credentials) => {
        setIsLoading(true)
        setError(null)
        try {
            const session = await loginRequest(credentials)
            saveSession(session)
            return session
        } catch (err) {
            setError(err.message ?? 'No se pudo iniciar sesión')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}
