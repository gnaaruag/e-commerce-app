import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layout";
import Home from "../pages/home";
import LoginForm from "../pages/signin";
import SignupForm from "../pages/signup";
import Saree from "../pages/collections/saree";
import Lehenga from "../pages/collections/lehenga";
import KurtasM from "../pages/collections/kurtasm";
import KurtasFM from "../pages/collections/kurtasfm";
import GiftSet from "../pages/collections/giftset";
import PrivacyPolicy from "../pages/privacy-policy";
import TermsOfService from "../pages/terms-of-service";
import Contact from "../pages/contact";
import Search from "../pages/search";
import ProductItem from "../pages/product-item";
import Profile from "../pages/profile";
import Cart from "../pages/cart";
import ProtectedRoute from "./ProtectedRoute";
import PaymentSuccess from "../pages/success";
import PaymentFailure from "../pages/failure";

const router = createBrowserRouter([
  {
    path: "",
    element: <PageLayout />,
    ErrorBoundary: () => <>Failed to load the page</>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/signin",
        element: <LoginForm />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/returns-refunds",
        element: <TermsOfService />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute><Profile/></ProtectedRoute>,
      },
      {
        path: "/cart",
        element: <ProtectedRoute><Cart/></ProtectedRoute>,
      },
      {
        path: "/success",
        element: <ProtectedRoute><PaymentSuccess/></ProtectedRoute>,
      },
      {
        path: "/failure",
        element: <ProtectedRoute><PaymentFailure/></ProtectedRoute>,
      },
    ],
  },
  {
    path: "/collections",
    element: <PageLayout />,
    ErrorBoundary: () => <>Failed to load the page</>,
    children: [
      {
        path: "saree",
        element: <Saree />,
      },
      {
        path: "lehenga",
        element: <Lehenga />,
      },
      {
        path: "kurtas-for-her",
        element: <KurtasFM />,
      },
      {
        path: "kurtas-for-him",
        element: <KurtasM />,
      },
      {
        path: "gift-sets",
        element: <GiftSet />,
      },
    ],
  },
  {
    path: "/product",
    element: <PageLayout />,
    children: [
      {
        path: ":productId",
        element: <ProductItem />,
      },
    ],
  },
]);

export default router;
