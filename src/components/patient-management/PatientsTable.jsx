import { useMemo, useState } from 'react'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

const getFullName = (patient) =>
    [patient.firstName, patient.middleName, patient.lastName, patient.secondLastName]
        .filter(Boolean)
        .join(' ')

const getInitials = (patient) =>
    `${patient.firstName?.[0] ?? ''}${patient.lastName?.[0] ?? ''}`.toUpperCase()

const tableHeaders = ['Paciente', 'Teléfono', 'Correo', 'Acciones']

const PatientsTable = ({ patients, onAdd, onEdit, onDelete, canDelete, deletingPatientId }) => {
    const [search, setSearch] = useState('')

    const filteredPatients = useMemo(
        () =>
            patients.filter((patient) =>
                getFullName(patient).toLowerCase().includes(search.toLowerCase())
            ),
        [patients, search]
    )

    return (
        <section className="rounded-md border border-neutral/20 bg-white p-4 md:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-display text-xl font-semibold text-neutral">
                    Pacientes registrados
                </h2>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                        type="search"
                        placeholder="Buscar paciente…"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="w-full rounded-sm border-[1.5px] border-neutral px-3.5 py-2 text-sm text-neutral focus:border-primary focus:ring-3 focus:ring-primary/20 focus:outline-none sm:w-60"
                    />
                    <Button type="button" variant="primary" size="sm" onClick={onAdd}>
                        + Añadir paciente
                    </Button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.95rem]">
                    <thead>
                        <tr>
                            {tableHeaders.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-neutral/20 px-3.5 py-2.5 text-left text-xs font-semibold tracking-wide text-neutral/70 uppercase"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => (
                            <tr key={patient.id} className="transition-colors hover:bg-primary-50">
                                <td className="border-b border-neutral/20 px-3.5 py-2.5">
                                    <div className="flex items-center gap-2 font-medium text-neutral">
                                        <Avatar initials={getInitials(patient)} size="sm" />
                                        <span>{getFullName(patient)}</span>
                                    </div>
                                </td>
                                <td className="border-b border-neutral/20 px-3.5 py-2.5">{patient.phoneNumber}</td>
                                <td className="border-b border-neutral/20 px-3.5 py-2.5">{patient.email}</td>
                                <td className="border-b border-neutral/20 px-3.5 py-2.5">
                                    <Button variant="link" size="sm" onClick={() => onEdit(patient)}>
                                        Editar
                                    </Button>
                                    {canDelete && (
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700"
                                            disabled={deletingPatientId === patient.id}
                                            onClick={() => onDelete(patient)}
                                        >
                                            {deletingPatientId === patient.id ? 'Eliminando...' : 'Eliminar'}
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filteredPatients.length === 0 && (
                            <tr>
                                <td colSpan={tableHeaders.length} className="px-3.5 py-6 text-center text-neutral/60">
                                    No hay pacientes registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default PatientsTable
