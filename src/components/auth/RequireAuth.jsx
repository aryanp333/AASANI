import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/authService";

/**
 * Route guard: sends unauthenticated visitors to /login instead of
 * rendering the protected route.
 */
export function RequireAuth({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
