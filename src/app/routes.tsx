import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
                path: "/admin",
                element: <Admin />,
            },
        ]
    },
]);