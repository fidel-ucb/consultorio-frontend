import { useState } from 'react'
import AppointmentList from '../components/dashboard/AppointmentList'
import AppointmentForm from '../components/planner/AppointmentForm'
import PlannerCalendar from '../components/planner/PlannerCalendar'
import Button from '../components/ui/Button'
import { getWeekDays } from '../components/planner/plannerUtils'
import { useAppointments } from '../hooks/useAppointments'
import { usePatients } from '../hooks/usePatients'
import { usePsychologists } from '../hooks/usePsychologists'
import { getSession, hasAnyRole } from '../services/session'

const Planner = () => {
    const session = getSession()
    const isAdmin = hasAnyRole(session, ['Admin'])
    const isPsychologist = hasAnyRole(session, ['Psychologist'])
    const canViewCalendar = isAdmin || isPsychologist
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isSaving, setIsSaving] = useState(false)
    const [formError, setFormError] = useState(null)
    const [editingAppointment, setEditingAppointment] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [deletingAppointmentId, setDeletingAppointmentId] = useState(null)
    const { appointments, isLoading, error, addAppointment, editAppointment, removeAppointment } = useAppointments(isPsychologist ? { currentOnly: true } : {})
    const { patients, isLoading: patientsLoading, error: patientsError } = usePatients()
    const {
        psychologists,
        isLoading: psychologistsLoading,
        error: psychologistsError,
    } = usePsychologists({ isAdmin, isPsychologist })
    const selectedDayAppointments = appointments
        .filter((appointment) => new Date(appointment.startAt).toDateString() === selectedDate.toDateString())
        .sort((first, second) => new Date(first.startAt) - new Date(second.startAt))

    const handleAppointmentSubmit = async (appointment) => {
        setIsSaving(true)
        setFormError(null)
        try {
            const appointmentData = {
                ...appointment,
                patientId: Number(appointment.patientId),
                psychologistId: Number(appointment.psychologistId),
                type: Number(appointment.type),
                status: Number(appointment.status),
                startAt: new Date(appointment.startAt).toISOString(),
                endAt: new Date(appointment.endAt).toISOString(),
            }

            if (editingAppointment) {
                await editAppointment(editingAppointment.id, appointmentData)
            } else {
                await addAppointment(appointmentData)
            }
            setEditingAppointment(null)
            setIsFormOpen(false)
        } catch (err) {
            setFormError(err.message ?? 'No se pudo guardar la cita')
            throw err
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (appointment) => {
        if (!window.confirm('¿Eliminar esta cita?')) {
            return
        }

        setDeletingAppointmentId(appointment.id)
        setFormError(null)
        try {
            await removeAppointment(appointment.id)
            if (editingAppointment?.id === appointment.id) {
                setEditingAppointment(null)
            }
        } catch (err) {
            setFormError(err.message ?? 'No se pudo eliminar la cita')
        } finally {
            setDeletingAppointmentId(null)
        }
    }

    const handleCreate = () => {
        setEditingAppointment(null)
        setFormError(null)
        setIsFormOpen(true)
    }

    const handleEdit = (appointment) => {
        setEditingAppointment(appointment)
        setFormError(null)
        setIsFormOpen(true)
    }

    const handleCloseForm = () => {
        setEditingAppointment(null)
        setIsFormOpen(false)
    }

    const shiftWeek = (amount) => {
        const nextDate = new Date(selectedDate)
        nextDate.setDate(nextDate.getDate() + amount * 7)
        setSelectedDate(nextDate)
    }

    const weekDays = getWeekDays(selectedDate)
    const weekLabel = `${weekDays[0].toLocaleDateString('es', { day: 'numeric', month: 'short' })} - ${weekDays.at(-1).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })}`

    return (
        <main className="w-full">
            <section className="flex-1 px-4 py-6 md:px-12 md:py-10">
                <header className="mb-6 md:mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="font-display text-2xl font-semibold text-neutral md:text-3xl">Agenda</h1>
                            <p className="mt-1 text-[0.95rem] text-neutral">Calendario y gestión de citas.</p>
                        </div>
                        <Button size="sm"type="button" onClick={handleCreate}>Añadir cita</Button>
                    </div>
                </header>

                {(error || patientsError || psychologistsError || formError) && (
                    <p className="mb-4 text-sm font-medium text-red-600">{error ?? patientsError ?? psychologistsError ?? formError}</p>
                )}

                {canViewCalendar && (
                    <>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={() => shiftWeek(-1)} className="rounded-sm border border-neutral/30 px-3 py-2 text-lg text-neutral hover:bg-primary-50" aria-label="Semana anterior">‹</button>
                                <span className="min-w-48 text-center text-sm font-semibold capitalize text-neutral">Semana del {weekLabel}</span>
                                <button type="button" onClick={() => shiftWeek(1)} className="rounded-sm border border-neutral/30 px-3 py-2 text-lg text-neutral hover:bg-primary-50" aria-label="Semana siguiente">›</button>
                            </div>
                            <div className="flex gap-3 text-xs text-neutral/70">
                                <span><i className="mr-1 inline-block size-2 rounded-full bg-accent" />Cita</span>
                                <span><i className="mr-1 inline-block size-2 rounded-full bg-neutral/20" />Sin cita</span>
                            </div>
                        </div>
                        {isLoading ? <p className="text-neutral">Cargando calendario...</p> : (
                            <PlannerCalendar
                                appointments={appointments}
                                selectedDate={selectedDate}
                                onSelectDate={setSelectedDate}
                                showPsychologist={isAdmin}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                deletingAppointmentId={deletingAppointmentId}
                            />
                        )}
                        <section className="mt-6 rounded-md border border-neutral/20 bg-white p-5 shadow-sm md:p-6">
                            <h2 className="mb-1 font-display text-xl font-semibold text-neutral">Detalle del día</h2>
                            <p className="mb-4 text-sm capitalize text-neutral/60">
                                {selectedDate.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </p>
                            <AppointmentList
                                appointments={selectedDayAppointments}
                                perspective={isAdmin ? 'admin' : 'professional'}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                deletingAppointmentId={deletingAppointmentId}
                            />
                        </section>
                    </>
                )}

                {isFormOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <section
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="appointment-form-title"
                            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md bg-white p-5 shadow-lg md:p-6"
                        >
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <div>
                                    <h2 id="appointment-form-title" className="font-display text-xl font-semibold text-neutral">
                                        {editingAppointment ? 'Actualizar cita' : 'Nueva cita'}
                                    </h2>
                                    <p className="mt-1 text-sm text-neutral/60">
                                        {editingAppointment
                                            ? 'Modifica los datos de la cita seleccionada.'
                                            : 'Selecciona un paciente y define el horario de atención.'}
                                    </p>
                                </div>
                                <Button type="button" variant="ghost" size="sm" onClick={handleCloseForm} disabled={isSaving}>
                                    Cerrar
                                </Button>
                            </div>
                            {patientsLoading || psychologistsLoading ? (
                                <p className="text-sm text-neutral/60">Cargando pacientes y psicólogos...</p>
                            ) : (
                                <AppointmentForm
                                    patients={patients}
                                    psychologists={psychologists}
                                    isPsychologist={isPsychologist}
                                    onSubmit={handleAppointmentSubmit}
                                    isSaving={isSaving}
                                    initialValues={editingAppointment}
                                    onCancel={handleCloseForm}
                                />
                            )}
                        </section>
                    </div>
                )}
            </section>
        </main>
    )
}

export default Planner
