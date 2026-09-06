import { createBrowserRouter, Navigate } from 'react-router'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import PatientDashboard from '../pages/PatientDashboard'
import PatientManagement from '../pages/PatientManagement'
import Planner from '../pages/Planner'
import RequireRole from './RequireRole'
import AppLayout from '../components/layout/AppLayout'

export const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/login" replace /> },
    { path: '/login', element: <Login /> },
    {
        element: <AppLayout />,
        children: [
            {
                path: '/dashboard',
                element: (
                    <RequireRole roles={['Psychologist']}>
                        <Dashboard />
                    </RequireRole>
                ),
            },
            {
                path: '/patient-dashboard',
                element: (
                    <RequireRole roles={['Patient']}>
                        <PatientDashboard />
                    </RequireRole>
                ),
            },
            {
                path: '/patient-management',
                element: (
                    <RequireRole roles={['Admin', 'Psychologist']}>
                        <PatientManagement />
                    </RequireRole>
                ),
            },
            {
                path: '/planner',
                element: (
                    <RequireRole roles={['Admin', 'Psychologist']}>
                        <Planner />
                    </RequireRole>
                ),
            },
        ],
    },
])
