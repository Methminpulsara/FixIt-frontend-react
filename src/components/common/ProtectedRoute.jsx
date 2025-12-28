import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-10 text-white font-bold text-center">Verifying Access...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = user.type; 

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  if (userRole === 'admin') return <Outlet />;

  
  if (user && !user.isOnboarded && user.type !== 'admin') { 
    return <Navigate to={`/onboarding/${user.type}`} />;
}

  if (!user.isOnboarded && !location.pathname.startsWith('/onboarding')) {
    return <Navigate to={`/onboarding/${userRole}`} replace />;
  }

  if (user.role !== 'admin' && user.isOnboarded && !user.isVerified) {
    if (!location.pathname.startsWith('/pending-approval')) {
      return <Navigate to="/pending-approval" replace />;
    }
  }

  if (user.isVerified && location.pathname.startsWith('/pending-approval')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;