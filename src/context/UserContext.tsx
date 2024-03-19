"use client";

import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type UserContentInterface = {
  currentUser: string;
  hasAgreement: string;
  trackOwner: string;
  userTokens: string;
  setUserTokens: (tokens: string) => void;
  setHasAgreement: (value: string) => void;
  login: (user: string, trackOwnerData: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContentInterface>({
  currentUser: "",
  hasAgreement: "",
  trackOwner: "",
  userTokens: "",
  setUserTokens(tokens: string): void {},
  setHasAgreement(value: string): void {},
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useLocalStorage("current-user");
  const [hasAgreement, setHasAgreement] = useLocalStorage("user-agreement");
  const [trackOwner, setTrackOwner] = useLocalStorage("user-track-owner");
  const [userTokens, setUserTokens] = useLocalStorage("user-tokens");

  const login = (user: string, trackOwnerData: string) => {
    setCurrentUser(user);
    setTrackOwner(trackOwnerData);
  };

  const logout = () => {
    setCurrentUser("");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        hasAgreement,
        trackOwner,
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
