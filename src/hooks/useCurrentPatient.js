import { useEffect, useState } from 'react'
import { getCurrentPatient } from '../services/patientService'

export const useCurrentPatient = () => {
    const [patient, setPatient] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                setPatient(await getCurrentPatient())
            } catch (err) {
                setError(err.message ?? 'No se pudo cargar el paciente')
            } finally {
                setIsLoading(false)
            }
        }

        fetchPatient()
    }, [])

    return { patient, isLoading, error }
}