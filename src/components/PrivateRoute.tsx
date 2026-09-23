import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

/**
 * Wraps any route that requires authentication.
 *
 * - Authenticated → renders `children` as-is.
 * - Unauthenticated → redirects to `/personal`, passing the attempted path in
 *   `location.state.from` so the login page can send the user back after a
 *   successful unlock.
 *
 * Usage in App.tsx:
 *   <Route path="/track" element={<PrivateRoute><TrackPage /></PrivateRoute>} />
 *
 * Adding a new protected route in the future is one line:
 *   <Route path="/new-tool" element={<PrivateRoute><NewTool /></PrivateRoute>} />
 */
export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/personal"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
}
