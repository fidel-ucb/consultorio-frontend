import { useState } from 'react'
import FormField from '../ui/FormField'
import Button from '../ui/Button'

const LoginForm = ({ onSubmit, isLoading, error }) => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false,
    })

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit?.(form)
    }

    return (
        <form className="mt-2 flex flex-col gap-5" onSubmit={handleSubmit}>
            <FormField
                label="Correo electrónico"
                type="email"
                name="email"
                placeholder="nombre@correo.com"
                autoComplete="email"
                required
                value={form.email}
                onChange={(event) => handleChange('email', event.target.value)}
            />

            <FormField
                label="Contraseña"
                type="password"
                name="password"
                placeholder="********"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={(event) => handleChange('password', event.target.value)}
            />

            {error && (
                <p className="text-center text-sm font-medium text-red-600">{error}</p>
            )}

            <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
        </form>
    )
}

export default LoginForm
