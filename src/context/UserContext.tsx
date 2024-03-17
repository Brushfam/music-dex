"use client";

import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type UserContentInterface = {
  currentUser: string;
  hasAgreement: string;
  userTokens: string;
  setUserTokens: (tokens: string) => void;
  setHasAgreement: (value: string) => void;
  login: (user: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContentInterface>({
  setHasAgreement(value: string): void {},
  currentUser: "",
  hasAgreement: "",
  userTokens: "",
  setUserTokens(tokens: string): void {},
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useLocalStorage("current-user");
  const [hasAgreement, setHasAgreement] = useLocalStorage("user-agreement");
  const [userTokens, setUserTokens] = useLocalStorage("user-tokens");

  const login = (user: string) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser("");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        hasAgreement,
        userTokens,
        setUserTokens,
        setHasAgreement,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UseUser = () => {
  return useContext(UserContext);
};
