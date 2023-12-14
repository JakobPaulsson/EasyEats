import React, { createContext, useState, useEffect, useMemo } from "react";
import { User } from "../types/user.interface";
import * as UserService from "../services/UserService";

interface UserContextType {
  isLoggedIn: boolean;
  currentUser: User | undefined;
  setUser: (user: User) => void;
  login: () => void;
  logout: () => void;
}

interface UserContextProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: UserContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    const checkCurrentUser = async () => {
      await UserService.currentUser().then((response) => {
        if (response && response.data) {
          setIsLoggedIn(true);
          setCurrentUser(response.data.user);
        } else {
          setIsLoggedIn(false);
        }
      });
    };

    checkCurrentUser();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    if (!currentUser) return false;
    const loggedout = await UserService.logoutUser(currentUser.UserID);
    if (loggedout) {
      setCurrentUser(undefined);
      setIsLoggedIn(false);
    }
    return loggedout;
  };

  const setUser = (user: User) => {
    setCurrentUser(user);
  };

  const value = useMemo(
    () => ({
      currentUser,
      isLoggedIn,
      login,
      logout,
      setUser,
    }),
    [currentUser, isLoggedIn]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
