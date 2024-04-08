"use client";

import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type UserContentInterface = {
  currentUser: string;
  wallet: string;
  hasAgreement: string;
  trackOwner: string;
  latestPurchase: string;
  setLatestPurchase: (value: string) => void;
  setHasAgreement: (value: string) => void;
  login: (user: string, trackOwnerData: string, wallet: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContentInterface>({
  currentUser: "",
  wallet: "",
  hasAgreement: "",
  trackOwner: "",
  latestPurchase: "",
  setLatestPurchase(value: string): void {},
  setHasAgreement(value: string): void {},
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useLocalStorage("current-user");
  const [wallet, setWallet] = useLocalStorage("user-wallet");
  const [hasAgreement, setHasAgreement] = useLocalStorage("user-agreement");
  const [trackOwner, setTrackOwner] = useLocalStorage("user-track-owner");
  const [latestPurchase, setLatestPurchase] = useLocalStorage("user-purchase")

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
    setLatestPurchase("")
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        wallet,
        hasAgreement,
        trackOwner,
        latestPurchase,
        setLatestPurchase,
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
