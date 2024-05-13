import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const authenticated = !!localStorage.getItem("authToken");
  if (authenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
