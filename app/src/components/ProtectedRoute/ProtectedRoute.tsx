// ProtectedRoute.tsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // Adjust the import path as needed
import PositionedSnackbar from "../PositionedSnackbar/PositionedSnackbar";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isLoggedIn } = authContext;

  return isLoggedIn ? element : <Navigate to="/" state={{ failed: true }} />;
};

export default ProtectedRoute;
