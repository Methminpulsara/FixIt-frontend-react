// src/components/common/ProtectedRoute.jsx

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-10 text-white">Verifying...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 💡 වෙනස් කළ යුත්ත: user.role වෙනුවට user.type පාවිච්චි කරන්න
  const userRole = user.type; 

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.log("Access Denied for role:", userRole); // මෙතනින් console එකේ බලාගන්න පුළුවන් වැරැද්ද
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;