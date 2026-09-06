import { Outlet } from 'react-router'
import Footer from './Footer'
import Sidebar from './Sidebar'

const AppLayout = () => {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <Sidebar />
            <div className="flex min-h-screen flex-1 flex-col">
                <div className="flex-1">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AppLayout