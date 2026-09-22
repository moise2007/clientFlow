import { createBrowserRouter } from "react-router-dom"
import RegisterCheckRole from "../features/auth/pages/shared/checkRole.inscription"
import RegisterAdmin from "../features/auth/pages/admin/inscription"
import AppLayout from "../app/app_layout"
import AppCommercial from "../app/app.commercial"
import AppAuth from "../app/app.auth"
import AppAdmin from "../app/app.admin"
import Login from "../features/auth/pages/shared/connexion"
import RegisterCommercial from "../features/auth/pages/commercial/inscription"
import DashboardAdmin from "../features/admin/pages/DashboardAdmin"
import SettingsAdmin from "../features/admin/pages/SettingsAdmin"
import ProjectsAdmin from "../features/admin/pages/ProjectsAdmin"
import CollaboratorsAdmin from "../features/admin/pages/CollaboratorsAdmin"
import ProjectDetails from "../features/projects/ProjectDetails"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "/",
                element: <AppAuth/>,
                children: [
                    { path: "", element: <RegisterCheckRole />},
                    { path: "auth", element: <RegisterCheckRole />},
                    { path: "auth/administrateur", element: <RegisterAdmin />},
                    { path: "auth/connexion", element: <Login />},
                    { path: "auth/commercial", element: <RegisterCommercial />},
                ]
            },
            {
                path: "/admin",
                element: <AppAdmin />,
                children: [
                    {
                        index: true,
                        element: <DashboardAdmin />,
                    },
                    {
                        path: "dashboard",
                        element: <DashboardAdmin />,
                    },
                    {
                        path: "parametres",
                        element: <SettingsAdmin />,
                    },
                    {
                        path: "projets",
                        element: <ProjectsAdmin />,
                    },
                    {
                        path: "collaborateurs",
                        element: <CollaboratorsAdmin />,
                    },
                    {
                        path: "projets/:projectId",
                        element: <ProjectDetails />,
                    }
                ]
            },
            {
                path: "/commercial",
                element: <AppCommercial />,
                children: []
            }
        ]
    }
]) 