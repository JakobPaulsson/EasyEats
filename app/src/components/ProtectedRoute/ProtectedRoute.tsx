// ProtectedRoute.tsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext"; // Adjust the import path as needed

interface ProtectedRouteProps {
  element: React.ReactElement;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within an AuthProvider");
  }

  const { isLoggedIn } = userContext;

  return isLoggedIn ? element : <Navigate to="/" state={{ failed: true }} />;
};

export default ProtectedRoute;
