
import {  createBrowserRouter } from "react-router-dom";

import Home from "../pages/home";
import PageLayout from "../layout";
import LoginForm from "../pages/signin";
import SignupForm from "../pages/signup";
import Saree from "../pages/collections/saree"
import Lehenga from "../pages/collections/lehenga"
import KurtasM from "../pages/collections/kurtasm"
import KurtasFM from "../pages/collections/kurtasfm"
import GiftSet from "../pages/collections/giftset"
import PrivacyPolicy from "../pages/privacy-policy";


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
            {
                path: "/privacy-policy",
                element: <PrivacyPolicy/>
            },
        ]
    },
    {
        path: "/collections",
        element: (
            <PageLayout/>
        ),
        ErrorBoundary: () => <>Failed to load the page</>,
        children: [
            {
                path: "saree",
                element: <Saree/>
            },
            {
                path: "lehenga",
                element: <Lehenga/>
            },
            {
                path: "kurtas-for-her",
                element: <KurtasFM/>
            },
            {
                path: "kurtas-for-him",
                element: <KurtasM/>
            },
            {
                path: "gift-sets",
                element: <GiftSet/>
            },
        ]
    },
    // {
    //     path: "/notfound",
    //     element: <NotFound />
    // },
    
]);
export default router;
