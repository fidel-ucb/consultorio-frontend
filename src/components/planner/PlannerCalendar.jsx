import { getWeekDays } from './plannerUtils'

const HOURS = Array.from({ length: 10 }, (_, index) => index + 9)

const formatDay = (date) =>
    new Intl.DateTimeFormat('es', { weekday: 'short', day: 'numeric' }).format(date)

const formatTime = (value) =>
    new Intl.DateTimeFormat('es', { hour: '2-digit', minute: '2-digit' }).format(new Date(value))

const getAppointmentsForSlot = (appointments, day, hour) =>
    appointments.filter((appointment) => {
        const start = new Date(appointment.startAt)
        return start.toDateString() === day.toDateString() && start.getHours() === hour
    })

const PlannerCalendar = ({
    appointments,
    selectedDate,
    onSelectDate,
    showPsychologist,
    onEdit,
    onDelete,
    deletingAppointmentId,
}) => {
    const days = getWeekDays(selectedDate)

    return (
        <div className="overflow-x-auto rounded-md border border-neutral/20 bg-white shadow-sm">
            <div className="grid min-w-[960px] grid-cols-[64px_repeat(7,minmax(130px,1fr))]">
                <div className="border-b border-r border-neutral/15 p-3" />
                {days.map((day) => (
                    <button
                        key={day.toISOString()}
                        type="button"
                        onClick={() => onSelectDate(day)}
                        className={`border-b border-r border-neutral/15 p-3 text-center text-sm font-semibold capitalize transition-colors hover:bg-primary-50 ${
                            day.toDateString() === selectedDate.toDateString()
                                ? 'bg-primary-50 text-primary'
                                : 'text-neutral'
                        }`}
                    >
                        {formatDay(day)}
                    </button>
                ))}
                {HOURS.map((hour) => (
                    <div key={hour} className="contents">
                        <div className="border-b border-r border-neutral/15 p-2 text-right text-xs text-neutral/60">
                            {String(hour).padStart(2, '0')}:00
                        </div>
                        {days.map((day) => {
                            const slotAppointments = getAppointmentsForSlot(appointments, day, hour)
                            return (
                                <div key={`${day.toISOString()}-${hour}`} className="min-h-16 border-b border-r border-neutral/15 p-1">
                                    {slotAppointments.map((appointment) => (
                                        <div key={appointment.id} className="rounded-sm border-l-3 border-accent bg-accent/10 p-2 text-xs text-neutral">
                                            <p className="font-semibold">{formatTime(appointment.startAt)}</p>
                                            <p className="truncate">{appointment.patientName}</p>
                                            {showPsychologist && (
                                                <p className="truncate text-neutral/65">Psic. {appointment.psychologistName}</p>
                                            )}
                                            {(onEdit || onDelete) && (
                                                <div className="mt-2 flex gap-1">
                                                    {onEdit && (
                                                        <button
                                                            type="button"
                                                            onClick={() => onEdit(appointment)}
                                                            className="rounded-sm border border-neutral/30 px-1.5 py-1 font-semibold hover:bg-white"
                                                        >
                                                            Actualizar
                                                        </button>
                                                    )}
                                                    {onDelete && (
                                                        <button
                                                            type="button"
                                                            onClick={() => onDelete(appointment)}
                                                            disabled={deletingAppointmentId === appointment.id}
                                                            className="rounded-sm border border-red-600/30 px-1.5 py-1 font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                                        >
                                                            {deletingAppointmentId === appointment.id ? '...' : 'Eliminar'}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlannerCalendar
