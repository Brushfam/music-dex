"use client";

import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type UserContentInterface = {
  currentUser: string;
  wallet: string;
  hasAgreement: string;
  trackOwner: string;
  setHasAgreement: (value: string) => void;
  login: (user: string, trackOwnerData: string, wallet: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContentInterface>({
  currentUser: "",
  wallet: "",
  hasAgreement: "",
  trackOwner: "",
  setHasAgreement(value: string): void {},
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useLocalStorage("current-user");
  const [wallet, setWallet] = useLocalStorage("user-wallet");
  const [hasAgreement, setHasAgreement] = useLocalStorage("user-agreement");
  const [trackOwner, setTrackOwner] = useLocalStorage("user-track-owner");

  const login = (
    user: string,
    trackOwnerData: string,
    currentWallet: string,
  ) => {
    setCurrentUser(user);
    setWallet(currentWallet);
    setTrackOwner(trackOwnerData);
  };

  const logout = () => {
    setCurrentUser("");
      setWallet("");
      setHasAgreement("");
      setTrackOwner("");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        wallet,
        hasAgreement,
        trackOwner,
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
