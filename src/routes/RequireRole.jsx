import { Navigate } from 'react-router'
import { getSession, hasAnyRole } from '../services/authService'

const RequireRole = ({ roles, children }) => {
    const session = getSession()

    if (!session || !hasAnyRole(session, roles)) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default RequireRole
