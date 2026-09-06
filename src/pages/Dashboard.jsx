import AppointmentList from '../components/dashboard/AppointmentList'
import DashboardCard from '../components/dashboard/DashboardCard'
import { useAppointments } from '../hooks/useAppointments'
import { usePatients } from '../hooks/usePatients'
import { getSession } from '../services/session'

const Dashboard = () => {
    const { appointments, isLoading: appointmentsLoading, error: appointmentsError } = useAppointments({ currentOnly: true })
    const { patients, isLoading: patientsLoading, error: patientsError } = usePatients()
    const session = getSession()
    const today = new Date().toDateString()
    const todayAppointments = appointments.filter(
        (appointment) => new Date(appointment.startAt).toDateString() === today
    )
    const upcomingAppointments = [...appointments]
        .filter((appointment) => new Date(appointment.startAt) >= new Date())
        .sort((first, second) => new Date(first.startAt) - new Date(second.startAt))
        .slice(0, 5)

    return (
        <main className="w-full">
            <section className="flex-1 px-4 py-6 md:px-12 md:py-10">
                <header className="mb-6 md:mb-8">
                    <h1 className="font-display text-2xl font-semibold text-neutral md:text-3xl">
                        Área del profesional
                    </h1>
                    <p className="mt-1 text-[0.95rem] text-neutral">
                        Panel de gestión para el equipo terapéutico, {session?.name ?? 'profesional'}.
                    </p>
                </header>

                {(appointmentsError || patientsError) && (
                    <p className="mb-4 text-sm font-medium text-red-600">
                        {appointmentsError ?? patientsError}
                    </p>
                )}

                <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <DashboardCard
                        label="Citas hoy"
                        value={appointmentsLoading ? '...' : todayAppointments.length}
                        detail="Según las citas disponibles"
                    />
                    <DashboardCard
                        label="Pacientes registrados"
                        value={patientsLoading ? '...' : patients.length}
                        detail="Pacientes disponibles en el sistema"
                    />
                    <DashboardCard
                        label="Citas próximas"
                        value={appointmentsLoading ? '...' : upcomingAppointments.length}
                        detail="Próximas cinco citas"
                    />
                    <DashboardCard
                        label="Citas totales"
                        value={appointmentsLoading ? '...' : appointments.length}
                        detail="Registros disponibles"
                    />
                </div>

                <section className="rounded-md border border-neutral/20 bg-white p-5 shadow-sm md:p-6">
                    <h2 className="mb-4 border-b border-neutral/15 pb-3 font-display text-xl font-semibold text-neutral">
                        Próximas citas
                    </h2>
                    <AppointmentList appointments={upcomingAppointments} perspective="professional" />
                </section>
            </section>
        </main>
    )
}

export default Dashboard
