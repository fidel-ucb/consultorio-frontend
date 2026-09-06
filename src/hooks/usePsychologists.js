import { useCallback, useEffect, useState } from 'react'
import { getCurrentPsychologist, getPsychologists } from '../services/psychologistService'

export const usePsychologists = ({ isAdmin, isPsychologist }) => {
    const [psychologists, setPsychologists] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchPsychologists = useCallback(async () => {
        if (!isAdmin && !isPsychologist) {
            return
        }

        setIsLoading(true)
        setError(null)
        try {
            const data = isAdmin ? await getPsychologists() : await getCurrentPsychologist()
            setPsychologists(isAdmin ? data ?? [] : data ? [data] : [])
        } catch (err) {
            setError(err.message ?? 'No se pudieron cargar los psicólogos')
        } finally {
            setIsLoading(false)
        }
    }, [isAdmin, isPsychologist])

    useEffect(() => {
        fetchPsychologists()
    }, [fetchPsychologists])

    return { psychologists, isLoading, error, refetch: fetchPsychologists }
}
