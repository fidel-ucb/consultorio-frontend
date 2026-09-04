import { useCallback, useEffect, useState } from 'react'
import { createPatient, deletePatient, getPatients, updatePatient } from '../services/patientService'

export const usePatients = () => {
    const [patients, setPatients] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchPatients = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await getPatients()
            setPatients(data ?? [])
        } catch (err) {
            setError(err.message ?? 'No se pudieron cargar los pacientes')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPatients()
    }, [fetchPatients])

    const addPatient = async (patient) => {
        const created = await createPatient(patient)
        setPatients((prev) => [...prev, created])
        return created
    }

    const editPatient = async (id, patient) => {
        const updated = await updatePatient(id, patient)
        setPatients((prev) => prev.map((p) => (p.id === id ? updated : p)))
        return updated
    }

    const removePatient = async (id) => {
        await deletePatient(id)
        setPatients((prev) => prev.filter((patient) => patient.id !== id))
    }

    return {
        patients,
        isLoading,
        error,
        addPatient,
        editPatient,
        removePatient,
        refetch: fetchPatients,
    }
}
