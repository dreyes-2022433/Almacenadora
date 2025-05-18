import { AuthPage } from "./pages/AuthPage"
import { NotFound } from "./pages/NotFound"
import { ReportsPage } from './pages/ReportsPage'

import { Home } from "./pages/Mainpage.jsx"
import { SupplierComponent } from "./components/Supplier/SupplierComponent.jsx"
import { ClientComponent } from "./components/Cllient/ClientComponent.jsx"


export const routes = [
    {path: '/', element: <AuthPage /> },
    {path: '/Home', element: <Home /> },
    {path: '/*', element: <NotFound /> },
    {path: '/suppliers', element: <SupplierComponent/>},
    {path: '/clients', element: <ClientComponent />},
    {path: '/reports', element: <ReportsPage /> }
]