const appointmentTypeLabels = {
    0: 'Presencial',
    1: 'En línea',
}

const appointmentStatusLabels = {
    0: 'Programada',
    1: 'Confirmada',
    2: 'Cancelada',
    3: 'Completada',
    4: 'No asistió',
}

export const getAppointmentTypeLabel = (type) => appointmentTypeLabels[type] ?? type

export const getAppointmentStatusLabel = (status) => appointmentStatusLabels[status] ?? status

export const getAppointmentTypeVariant = (type) => (Number(type) === 1 ? 'info' : 'active')

export const getAppointmentStatusVariant = (status) => {
    const variants = {
        0: 'pending',
        1: 'active',
        2: 'inactive',
        3: 'info',
        4: 'inactive',
    }

    return variants[status] ?? 'inactive'
}
