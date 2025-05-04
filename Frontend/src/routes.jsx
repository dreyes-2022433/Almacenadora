import { AuthPage } from "./pages/AuthPage"
import { NotFound } from "./pages/NotFound"

import { Home } from "./pages/Mainpage.jsx"


export const routes = [
    {path: '/', element: <AuthPage /> },
    {path: '/Home', element: <Home /> },
    {path: '/*', element: <NotFound /> },
]