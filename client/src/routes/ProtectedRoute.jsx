import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
  const authenticated = !!localStorage.getItem("token");
  if (authenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />;
 }
}