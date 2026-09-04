const SESSION_KEY = 'consultorio_session'

export const saveSession = (session) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export const getSession = () => {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
}

export const clearSession = () => {
    localStorage.removeItem(SESSION_KEY)
}

export const hasAnyRole = (session, allowedRoles) =>
    Boolean(session?.roles?.some((role) => allowedRoles.includes(role)))
