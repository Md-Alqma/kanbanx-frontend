import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) return <p>Loading...</p>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
