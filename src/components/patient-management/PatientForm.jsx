import { useEffect, useState } from 'react'
import FormField from '../ui/FormField'
import Button from '../ui/Button'

const emptyForm = {
    firstName: '',
    middleName: '',
    lastName: '',
    secondLastName: '',

    birthDate: '',
    phoneNumber: '',
    email: '',
}

const PatientForm = ({ initialValues, onSubmit, onCancel, isSaving }) => {
    const [form, setForm] = useState(emptyForm)

    useEffect(() => {
        if (!initialValues) {
            setForm(emptyForm)
            return
        }
        // null/undefined values from the API must become '' to avoid "null" showing up in inputs
        const sanitized = Object.fromEntries(
            Object.keys(emptyForm).map((key) => [key, initialValues[key] ?? ''])
        )
        // <input type="date"> only accepts yyyy-MM-dd, but the API returns a full ISO datetime
        if (sanitized.birthDate) {
            sanitized.birthDate = sanitized.birthDate.slice(0, 10)
        }
        setForm(sanitized)
    }, [initialValues])

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit?.(form)
    }

    return (
        <section className="mx-auto mb-8 w-full max-w-4xl rounded-md border border-neutral/20 bg-white p-4 md:p-6">
            <h2 className="mb-4 font-display text-xl font-semibold text-neutral">
                {initialValues ? 'Editar paciente' : 'Nuevo paciente'}
            </h2>
            <form className="flex flex-col gap-4 rounded-md bg-background p-4 md:p-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        label="Nombre *"
                        placeholder="Nombre"
                        required
                        value={form.firstName}
                        onChange={(event) => handleChange('firstName', event.target.value)}
                    />
                    <FormField
                        label="Segundo nombre"
                        placeholder="Segundo nombre"
                        value={form.middleName}
                        onChange={(event) => handleChange('middleName', event.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        label="Apellido paterno *"
                        placeholder="Apellido paterno"
                        required
                        value={form.lastName}
                        onChange={(event) => handleChange('lastName', event.target.value)}
                    />
                    <FormField
                        label="Apellido materno"
                        placeholder="Apellido materno"
                        value={form.secondLastName}
                        onChange={(event) => handleChange('secondLastName', event.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        label="Fecha de nacimiento *"
                        type="date"
                        required
                        value={form.birthDate}
                        onChange={(event) => handleChange('birthDate', event.target.value)}
                    />
                    <FormField
                        label="Teléfono"
                        type="tel"
                        placeholder="600 000 000"
                        value={form.phoneNumber}
                        onChange={(event) => handleChange('phoneNumber', event.target.value)}
                    />
                </div>

                <FormField
                    label="Correo electrónico *"
                    type="email"
                    placeholder="correo@correo.com"
                    required
                    value={form.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                />

                <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary" size="sm" disabled={isSaving}>
                        {isSaving ? 'Guardando...' : 'Guardar paciente'}
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default PatientForm
