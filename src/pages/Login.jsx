import Logo from '../components/login/Logo'
import LoginAside from '../components/login/LoginAside'
import LoginForm from '../components/login/LoginForm'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (data) => {
        try {
            const result = await login({ email: data.email, password: data.password })
            console.log('Login success:', result)
        } catch {
            // error message is already tracked by useLogin
        }
    }

    return (
        <main className="flex h-screen w-full">
            <section className="mx-auto flex w-full max-w-120 flex-col justify-center gap-5 px-10 py-16">
                <Logo />
                <h1 className="font-display text-3xl leading-tight font-semibold text-neutral">
                    Bienvenido
                </h1>
                <p className="text-[0.95rem] text-neutral">Accede a tu área personal</p>
                <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
            </section>
            <LoginAside />
        </main>
    )
}

export default Login

