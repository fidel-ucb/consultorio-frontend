import { useCallback, useEffect, useState } from 'react'
import {
    createAppointment,
    deleteAppointment,
    getAppointments,
    getCurrentAppointments,
    updateAppointment,
} from '../services/appointmentService'

export const useAppointments = ({ currentOnly = false } = {}) => {
    const [appointments, setAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchAppointments = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = currentOnly ? await getCurrentAppointments() : await getAppointments()
            setAppointments(data ?? [])
        } catch (err) {
            setError(err.message ?? 'No se pudieron cargar las citas')
        } finally {
            setIsLoading(false)
        }
    }, [currentOnly])

    useEffect(() => {
        fetchAppointments()
    }, [fetchAppointments])

    const addAppointment = async (appointment) => {
        const created = await createAppointment(appointment)
        setAppointments((prev) => [...prev, created])
        return created
    }

    const editAppointment = async (appointmentId, appointment) => {
        const updated = await updateAppointment(appointmentId, appointment)
        setAppointments((previous) =>
            previous.map((currentAppointment) =>
                currentAppointment.id === appointmentId ? updated : currentAppointment
            )
        )
        return updated
    }

    const removeAppointment = async (appointmentId) => {
        await deleteAppointment(appointmentId)
        setAppointments((previous) =>
            previous.filter((currentAppointment) => currentAppointment.id !== appointmentId)
        )
    }

    return {
        appointments,
        isLoading,
        error,
        addAppointment,
        editAppointment,
        removeAppointment,
        refetch: fetchAppointments,
    }
}
