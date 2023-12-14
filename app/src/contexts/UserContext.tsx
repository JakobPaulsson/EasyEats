import React, { createContext, useState, useEffect } from "react";
import * as UserService from "../services/UserService";

interface UserContextType {
  isLoggedIn: boolean;
  currentUserID: number;
  setUserID: (id: number) => void;
  login: () => void;
  logout: () => void;
}

interface UserContextProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: UserContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUserID, setCurrentUserID] = useState<number>(0);

  useEffect(() => {
    const checkCurrentUser = async () => {
      const currentUser = await UserService.currentUser();
      if (currentUser) {
        setIsLoggedIn(true);
        setCurrentUserID(currentUser.data.userID);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkCurrentUser();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    const loggedout = await UserService.logoutUser(currentUserID);
    if (loggedout) {
      setCurrentUserID(0);
      setIsLoggedIn(false);
    }
    return loggedout;
  };

  const setUserID = (id: number) => {
    setCurrentUserID(id);
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, login, logout, currentUserID, setUserID }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
