import { useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import PatientForm from '../components/patient-management/PatientForm'
import PatientsTable from '../components/patient-management/PatientsTable'
import { usePatients } from '../hooks/usePatients'
import { getSession, hasAnyRole } from '../services/session'

const PatientManagement = () => {
    const { patients, isLoading, error, addPatient, editPatient, removePatient } = usePatients()
    const canDelete = hasAnyRole(getSession(), ['Admin'])
    const [editingPatient, setEditingPatient] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [deletingPatientId, setDeletingPatientId] = useState(null)
    const [formError, setFormError] = useState(null)

    const handleAdd = () => {
        setEditingPatient(null)
        setFormError(null)
        setShowForm(true)
    }

    const handleEdit = (patient) => {
        setEditingPatient(patient)
        setFormError(null)
        setShowForm(true)
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditingPatient(null)
        setFormError(null)
    }

    const handleSubmit = async (data) => {
        setIsSaving(true)
        setFormError(null)
        try {
            if (editingPatient) {
                await editPatient(editingPatient.id, data)
            } else {
                await addPatient(data)
            }
            setShowForm(false)
            setEditingPatient(null)
        } catch (err) {
            setFormError(err.message ?? 'No se pudo guardar el paciente')
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (patient) => {
        if (!canDelete || !window.confirm(`¿Eliminar a ${patient.firstName} ${patient.lastName}?`)) {
            return
        }

        setDeletingPatientId(patient.id)
        setFormError(null)
        try {
            await removePatient(patient.id)
        } catch (err) {
            setFormError(err.message ?? 'No se pudo eliminar el paciente')
        } finally {
            setDeletingPatientId(null)
        }
    }

    return (
        <main className="flex min-h-screen w-full flex-col md:flex-row">
            <Sidebar />
            <section className="flex-1 px-4 py-6 md:px-12 md:py-10">
                <header className="mb-6 md:mb-8">
                    <h1 className="font-display text-2xl font-semibold text-neutral md:text-3xl">
                        Gestor de pacientes
                    </h1>
                    <p className="mt-1 text-[0.95rem] text-neutral">
                        Dar de alta, editar y administrar pacientes.
                    </p>
                </header>

                {error && <p className="mb-4 text-sm font-medium text-red-600">{error}</p>}
                {formError && <p className="mb-4 text-sm font-medium text-red-600">{formError}</p>}

                {showForm && (
                    <>
                        <PatientForm
                            initialValues={editingPatient}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            isSaving={isSaving}
                        />
                    </>
                )}

                {isLoading && <p className="text-neutral">Cargando pacientes…</p>}

                {!showForm && !isLoading && patients.length === 0 && (
                    <p className="text-neutral">No hay pacientes registrados.</p>
                )}

                {!showForm && !isLoading && patients.length > 0 && (
                        <PatientsTable
                            patients={patients}
                            onAdd={handleAdd}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            canDelete={canDelete}
                            deletingPatientId={deletingPatientId}
                        />
                )}
            </section>
        </main>
    )
}

export default PatientManagement
