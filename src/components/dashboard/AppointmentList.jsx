import Badge from '../ui/Badge'
import {
    getAppointmentStatusLabel,
    getAppointmentStatusVariant,
    getAppointmentTypeLabel,
    getAppointmentTypeVariant,
} from '../planner/appointmentLabels'

const formatDate = (value, options = {}) =>
    new Intl.DateTimeFormat('es', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        ...options,
    }).format(new Date(value))

const AppointmentList = ({
    appointments,
    perspective = 'patient',
    emptyMessage = 'No hay citas registradas.',
    onEdit,
    onDelete,
    deletingAppointmentId,
}) => {
    if (appointments.length === 0) {
        return <p className="text-sm text-neutral/60">{emptyMessage}</p>
    }

    return (
        <ul className="space-y-2">
            {appointments.map((appointment) => (
                <li
                    key={appointment.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-sm px-3 py-2 transition-colors hover:bg-primary-50"
                >
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-neutral">
                            {perspective === 'patient' ? `Psic. ${appointment.psychologistName}` : appointment.patientName}
                        </p>
                        {perspective === 'admin' && (
                            <p className="text-xs text-neutral/65">Psicólogo: {appointment.psychologistName}</p>
                        )}
                        <p className="text-xs text-neutral/65">
                            {formatDate(appointment.startAt)}
                            {appointment.endAt && ` - ${formatDate(appointment.endAt, { hour: '2-digit', minute: '2-digit' })}`}
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                        <Badge variant={getAppointmentTypeVariant(appointment.type)}>
                            {getAppointmentTypeLabel(appointment.type)}
                        </Badge>
                        <Badge variant={getAppointmentStatusVariant(appointment.status)}>
                            {getAppointmentStatusLabel(appointment.status)}
                        </Badge>
                        {onEdit && (
                            <button
                                type="button"
                                onClick={() => onEdit(appointment)}
                                className="rounded-sm border border-neutral/30 px-2 py-1 text-xs font-semibold text-neutral transition-colors hover:bg-primary-50"
                            >
                                Actualizar
                            </button>
                        )}
                        {onDelete && (
                            <button
                                type="button"
                                onClick={() => onDelete(appointment)}
                                disabled={deletingAppointmentId === appointment.id}
                                className="rounded-sm border border-red-600/30 px-2 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {deletingAppointmentId === appointment.id ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default AppointmentList
