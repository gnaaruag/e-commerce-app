
import {  createBrowserRouter } from "react-router-dom";

import Home from "../pages/home";
import PageLayout from "../layout";
import LoginForm from "../pages/signin";
import SignupForm from "../pages/signup";

const router = createBrowserRouter([
    
    {
        path: "",
        element: (
            <PageLayout/>
        ),
        ErrorBoundary: () => <>Failed to load the page</>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/signup",
                element: <SignupForm/>
            },
            {
                path: "/signin",
                element: <LoginForm/>
            },
        ]
    },
    // {
    //     path: "/notfound",
    //     element: <NotFound />
    // },
    
]);
export default router;
