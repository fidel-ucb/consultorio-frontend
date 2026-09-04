import { createBrowserRouter, Navigate } from 'react-router'
import Login from '../pages/Login'
import PatientManagement from '../pages/PatientManagement'
import RequireRole from './RequireRole'

export const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/login" replace /> },
    { path: '/login', element: <Login /> },
    {
        path: '/patient-management',
        element: (
            <RequireRole roles={['Admin', 'Psychologist']}>
                <PatientManagement />
            </RequireRole>
        ),
    },
])
