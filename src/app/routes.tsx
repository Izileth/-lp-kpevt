import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ui/ProtectedRoute";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/events",
                element: <Events />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                ),
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ]
    },
]);