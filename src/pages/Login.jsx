import { useNavigate } from 'react-router'
import Logo from '../components/login/Logo'
import LoginAside from '../components/login/LoginAside'
import LoginForm from '../components/login/LoginForm'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const { login, isLoading, error } = useLogin()
    const navigate = useNavigate()

    const handleSubmit = async (data) => {
        try {
            await login({ email: data.email, password: data.password })
            navigate('/patient-management', { replace: true })
        } catch {
            // error message is already tracked by useLogin
        }
    }

    return (
        <main className="flex min-h-screen w-full">
            <section className="mx-auto flex w-full max-w-120 flex-col justify-center gap-5 px-6 py-10 md:px-10 md:py-16">
                <Logo />
                <h1 className="font-display text-3xl leading-tight font-semibold text-neutral">
                    Bienvenido
                </h1>
                <p className="text-[0.95rem] text-neutral">Accede a tu área personal</p>
                <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
                <aside className="rounded-md border border-primary/20 bg-primary-50 p-4 text-sm text-neutral">
                    <p className="font-semibold">Credenciales de prueba</p>
                    <p className="mt-1">Todas las cuentas utilizan la contraseña:</p>
                    <p className="mt-1 break-all font-semibold text-primary">Password@123456</p>
                    <ul className="mt-3 space-y-1 text-xs">
                        <li className="flex justify-between gap-3">
                            <span>admin@consultorio.com</span>
                            <span className="font-semibold">Admin</span>
                        </li>
                        <li className="flex justify-between gap-3">
                            <span>doctor.garcia@consultorio.com</span>
                            <span className="font-semibold">Psicólogo</span>
                        </li>
                        <li className="flex justify-between gap-3">
                            <span>juan.perez@example.com</span>
                            <span className="font-semibold">Paciente</span>
                        </li>
                    </ul>
                </aside>
            </section>
            <LoginAside />
        </main>
    )
}

export default Login
