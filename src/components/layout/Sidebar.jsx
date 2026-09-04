import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import Logo from '../login/Logo'
import Avatar from '../ui/Avatar'
import { clearSession, getSession } from '../../services/authService'

const navItems = [
    { label: 'Área Profesional', path: '/dashboard', implemented: false },
    { label: 'Área Paciente', path: '/patient-dashboard', implemented: false },
    { label: 'Gestor de Pacientes', path: '/patient-management', implemented: true },
    { label: 'Agenda', path: '/planner', implemented: false },
]

const navItemClasses = ({ isActive }) =>
    `-ml-0.5 rounded-sm border-l-3 px-4 py-2.5 text-[0.95rem] font-medium transition-colors ${
        isActive
            ? 'border-primary bg-white/10 text-white'
            : 'border-transparent text-white/90 hover:border-primary hover:bg-white/10'
    }`

const Sidebar = () => {
    const navigate = useNavigate()
    const session = getSession()
    const initials = session?.name?.slice(0, 1).toUpperCase() ?? '??'
    const role = session?.roles?.[0] ?? ''
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = () => {
        clearSession()
        navigate('/login', { replace: true })
    }

    const closeMenu = () => setIsOpen(false)

    return (
        <>
            <div className="flex items-center justify-between bg-neutral px-4 py-3 text-white md:hidden">
                <Logo variant="dark" />
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Abrir menú"
                    className="rounded-sm p-2 text-white/90 transition-colors hover:bg-white/10"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeMenu} />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-neutral py-6 text-white transition-transform duration-200 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between px-6">
                    <Logo variant="dark" />
                    <button
                        type="button"
                        onClick={closeMenu}
                        aria-label="Cerrar menú"
                        className="rounded-sm p-1 text-white/90 transition-colors hover:bg-white/10 md:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <nav className="mt-6 flex flex-1 flex-col gap-0.5 px-3">
                    {navItems.map((item) =>
                        item.implemented ? (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={navItemClasses}
                                onClick={closeMenu}
                            >
                                {item.label}
                            </NavLink>
                        ) : (
                            <span
                                key={item.path}
                                className="-ml-0.5 cursor-not-allowed border-l-3 border-transparent px-4 py-2.5 text-[0.95rem] font-medium text-white/40"
                            >
                                {item.label}
                            </span>
                        )
                    )}
                </nav>
                <div className="border-t border-white/20 px-3 pt-4">
                    <div className="flex items-center gap-2 px-1 pb-3">
                        <Avatar initials={initials} />
                        <div>
                            <p className="text-sm font-semibold">{session?.name}</p>
                            <p className="text-xs text-white/70">{role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full rounded-sm px-4 py-2.5 text-left text-[0.95rem] font-medium text-white/90 transition-colors hover:bg-white/10"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
