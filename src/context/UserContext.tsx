"use client";

import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type UserContentInterface = {
  currentUser: string;
  hasAgreement: string;
  trackOwner: string;
  latestPurchase: string;
  artistFormStep: string;
  setLatestPurchase: (value: string) => void;
  setHasAgreement: (value: string) => void;
  setArtistFormStep: (value: string) => void;
  login: (user: string, trackOwnerData: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContentInterface>({
  currentUser: "",
  hasAgreement: "",
  trackOwner: "",
  latestPurchase: "",
  artistFormStep: "",
  setLatestPurchase(value: string): void {},
  setHasAgreement(value: string): void {},
  setArtistFormStep(value: string): void {},
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useLocalStorage("current-user");
  const [hasAgreement, setHasAgreement] = useLocalStorage("user-agreement");
  const [trackOwner, setTrackOwner] = useLocalStorage("user-track-owner");
  const [latestPurchase, setLatestPurchase] = useLocalStorage("user-purchase");
  const [artistFormStep, setArtistFormStep] =
    useLocalStorage("user-artist-modal");

  const login = (
    user: string,
    trackOwnerData: string,
  ) => {
    setCurrentUser(user);
    setTrackOwner(trackOwnerData);
  };

  const logout = () => {
    setCurrentUser("");
    setTrackOwner("");
    setLatestPurchase("");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        hasAgreement,
        trackOwner,
        latestPurchase,
        artistFormStep,
        setLatestPurchase,
        setHasAgreement,
        setArtistFormStep,
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
