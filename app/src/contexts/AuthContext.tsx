import React, { createContext, useState, FunctionComponent } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  currentUserID: number;
  setUserID: (id: number) => void;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("userLoggedIn") === "true",
  );
  const [currentUserID, setCurrentUserID] = useState<number>(1);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const setUserID = (id: number) => {
    setCurrentUserID(id);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, currentUserID, setUserID }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
