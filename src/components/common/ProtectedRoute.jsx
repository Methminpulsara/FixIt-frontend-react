import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-10 text-white font-bold text-center">Verifying Access...</div>;

  // 1. යූසර් ලොග් වෙලා නැත්නම් Login එකට යවන්න
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = user.type; 

  // 2. Role එක අනුව Access තියෙනවාදැයි බැලීම
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  if (userRole === 'admin') return <Outlet />;

  
  if (user && !user.isOnboarded && user.type !== 'admin') { 
    return <Navigate to={`/onboarding/${user.type}`} />;
}

  // 3. Profile එක හදලා නැත්නම් (isOnboarded: false) Onboarding එකට යවන්න
  if (!user.isOnboarded && !location.pathname.startsWith('/onboarding')) {
    return <Navigate to={`/onboarding/${userRole}`} replace />;
  }

  // 4. Profile හදලා හැබැයි Admin approve කරලා නැත්නම් (isVerified: false)
  if (user.role !== 'admin' && user.isOnboarded && !user.isVerified) {
    if (!location.pathname.startsWith('/pending-approval')) {
      return <Navigate to="/pending-approval" replace />;
    }
  }

  // 5. Verified නම් සහ තවමත් Pending Approval පේජ් එකේ ඉන්නවා නම් Dashboard එකට යවන්න
  if (user.isVerified && location.pathname.startsWith('/pending-approval')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;