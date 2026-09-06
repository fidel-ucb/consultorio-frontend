import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import FormField from '../ui/FormField'

const initialForm = {
    patientId: '',
    psychologistId: '',
    startAt: '',
    endAt: '',
    type: 1,
    status: 0,
    notes: '',
}

const formatDateTimeLocal = (date) => {
    const pad = (value) => String(value).padStart(2, '0')

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const AppointmentForm = ({ patients, psychologists, isPsychologist, onSubmit, isSaving, initialValues, onCancel }) => {
    const [form, setForm] = useState(initialForm)

    useEffect(() => {
        if (initialValues) {
            setForm({
                patientId: initialValues.patientId ?? '',
                psychologistId: initialValues.psychologistId ?? '',
                startAt: initialValues.startAt ? formatDateTimeLocal(new Date(initialValues.startAt)) : '',
                endAt: initialValues.endAt ? formatDateTimeLocal(new Date(initialValues.endAt)) : '',
                type: initialValues.type ?? 1,
                status: initialValues.status ?? 0,
                notes: initialValues.notes ?? '',
            })
            return
        }

        if (isPsychologist && psychologists[0]) {
            setForm((previous) => ({ ...previous, psychologistId: psychologists[0].id }))
        }
    }, [initialValues, isPsychologist, psychologists])

    const handleChange = (field, value) => {
        setForm((previous) => ({ ...previous, [field]: value }))
    }

    const handleStartChange = (value) => {
        if (!value) {
            setForm((previous) => ({ ...previous, startAt: '', endAt: '' }))
            return
        }

        const endAt = new Date(value)
        endAt.setMinutes(endAt.getMinutes() + 50)
        setForm((previous) => ({ ...previous, startAt: value, endAt: formatDateTimeLocal(endAt) }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await onSubmit(form)
        setForm({
            ...initialForm,
            psychologistId: isPsychologist ? psychologists[0]?.id ?? '' : '',
        })
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-1 text-sm font-semibold text-neutral">
                Paciente
                <select
                    required
                    value={form.patientId}
                    onChange={(event) => handleChange('patientId', event.target.value)}
                    className="rounded-sm border-[1.5px] border-neutral px-3.5 py-2 font-normal focus:border-primary focus:ring-3 focus:ring-primary/20 focus:outline-none"
                >
                    <option value="">Seleccionar paciente</option>
                    {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                            {[patient.firstName, patient.lastName].filter(Boolean).join(' ')}
                        </option>
                    ))}
                </select>
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-neutral">
                Psicólogo
                <select
                    required
                    disabled={isPsychologist}
                    value={form.psychologistId}
                    onChange={(event) => handleChange('psychologistId', Number(event.target.value))}
                    className="rounded-sm border-[1.5px] border-neutral px-3.5 py-2 font-normal focus:border-primary focus:ring-3 focus:ring-primary/20 focus:outline-none disabled:bg-neutral/10 disabled:opacity-70"
                >
                    {!isPsychologist && <option value="">Seleccionar psicólogo</option>}
                    {psychologists.map((psychologist) => (
                        <option key={psychologist.id} value={psychologist.id}>
                            {[psychologist.firstName, psychologist.lastName].filter(Boolean).join(' ')}
                        </option>
                    ))}
                </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    label="Inicio"
                    type="datetime-local"
                    name="startAt"
                    required
                    value={form.startAt}
                    onChange={(event) => handleStartChange(event.target.value)}
                />
                <FormField
                    label="Fin"
                    type="datetime-local"
                    name="endAt"
                    required
                    value={form.endAt}
                    onChange={(event) => handleChange('endAt', event.target.value)}
                />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-semibold text-neutral">
                    Modalidad
                    <select
                        value={form.type}
                        onChange={(event) => handleChange('type', Number(event.target.value))}
                        className="rounded-sm border-[1.5px] border-neutral px-3.5 py-2 font-normal focus:border-primary focus:ring-3 focus:ring-primary/20 focus:outline-none"
                    >
                        <option value={1}>En línea</option>
                        <option value={0}>Presencial</option>
                    </select>
                </label>
                <FormField
                    label="Notas"
                    type="text"
                    name="notes"
                    value={form.notes}
                    onChange={(event) => handleChange('notes', event.target.value)}
                />
            </div>
            <Button
                type="submit"
                variant="primary"
                disabled={isSaving || patients.length === 0 || psychologists.length === 0}
            >
                {isSaving ? 'Guardando...' : initialValues ? 'Actualizar cita' : 'Reservar cita'}
            </Button>
            {initialValues && (
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isSaving}>
                    Cancelar
                </Button>
            )}
        </form>
    )
}

export default AppointmentForm
