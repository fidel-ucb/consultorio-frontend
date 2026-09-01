import { useState } from 'react'

const inputClasses =
    'rounded-sm border-[1.5px] border-neutral bg-white px-3.5 py-2.5 text-[0.95rem] text-neutral transition-colors focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/20'

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
            <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold tracking-wide text-neutral uppercase">
                    Correo electrónico
                </span>
                <input
                    type="email"
                    name="email"
                    placeholder="nombre@correo.com"
                    autoComplete="email"
                    required
                    className={inputClasses}
                    value={form.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                />
            </label>

            <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold tracking-wide text-neutral uppercase">
                    Contraseña
                </span>
                <input
                    type="password"
                    name="password"
                    placeholder="********"
                    autoComplete="current-password"
                    required
                    className={inputClasses}
                    value={form.password}
                    onChange={(event) => handleChange('password', event.target.value)}
                />
            </label>

            <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-neutral">
                    <input
                        type="checkbox"
                        name="remember"
                        className="size-4 accent-primary"
                        checked={form.remember}
                        onChange={(event) => handleChange('remember', event.target.checked)}
                    />
                    <span>Recordarme</span>
                </label>
                <a href="#" className="text-neutral hover:underline">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>

            {error && (
                <p className="text-center text-sm font-medium text-red-600">{error}</p>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-sm border-[1.5px] border-transparent bg-primary px-6 py-2.5 text-[0.92rem] font-semibold text-white transition-all hover:ring-3 hover:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>

            <p className="text-center text-sm text-neutral">
                ¿No tienes cuenta?{' '}
                <a href="#" className="font-semibold text-primary hover:underline">
                    Solicitar cita
                </a>
            </p>
        </form>
    )
}

export default LoginForm
