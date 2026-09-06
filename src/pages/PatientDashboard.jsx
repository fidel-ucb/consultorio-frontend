import AppointmentList from '../components/dashboard/AppointmentList'
import DashboardCard from '../components/dashboard/DashboardCard'
import { useAppointments } from '../hooks/useAppointments'
import { useCurrentPatient } from '../hooks/useCurrentPatient'
import { getSession } from '../services/session'

const PatientDashboard = () => {
    const { appointments, isLoading, error } = useAppointments({ currentOnly: true })
    const { patient, isLoading: patientLoading, error: patientError } = useCurrentPatient()
    const session = getSession()
    const upcomingAppointments = [...appointments]
        .filter((appointment) => new Date(appointment.startAt) >= new Date())
        .sort((first, second) => new Date(first.startAt) - new Date(second.startAt))
    const nextAppointment = upcomingAppointments[0]

    return (
        <main className="w-full">
            <section className="flex-1 px-4 py-6 md:px-12 md:py-10">
                <header className="mb-6 md:mb-8">
                    <h1 className="font-display text-2xl font-semibold text-neutral md:text-3xl">
                        Mi área personal
                    </h1>
                    <p className="mt-1 text-[0.95rem] text-neutral">
                        Hola, {patientLoading ? 'paciente' : patient?.firstName ?? session?.name ?? 'paciente'}. Aquí puedes consultar tus citas.
                    </p>
                </header>

                {(error || patientError) && (
                    <p className="mb-4 text-sm font-medium text-red-600">{error ?? patientError}</p>
                )}

                <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <DashboardCard
                        label="Citas próximas"
                        value={isLoading ? '...' : upcomingAppointments.length}
                        detail="Citas pendientes"
                    />
                    <DashboardCard
                        label="Cita más cercana"
                        value={nextAppointment ? new Date(nextAppointment.startAt).toLocaleDateString('es') : '-'}
                        detail={nextAppointment?.psychologistName ?? 'Sin citas programadas'}
                    />
                    <DashboardCard
                        label="Citas registradas"
                        value={isLoading ? '...' : appointments.length}
                        detail="Historial disponible"
                    />
                </div>

                <section className="rounded-md border border-neutral/20 bg-white p-5 shadow-sm md:p-6">
                    <h2 className="mb-4 border-b border-neutral/15 pb-3 font-display text-xl font-semibold text-neutral">
                        Mis próximas citas
                    </h2>
                    <AppointmentList appointments={upcomingAppointments} />
                </section>
            </section>
        </main>
    )
}

export default PatientDashboard
