import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  currentUser: string;
  hasAgreement: string;
  latestPurchase: string;
}

interface Actions {
  login: (user: string) => void;
  logout: () => void;
  setAgreement: (value: string) => void;
  setLatestPurchase: (value: string) => void;
}

const INITIAL_STATE: State = {
  currentUser: "",
  hasAgreement: "",
  latestPurchase: "",
};

// Use only for client components
export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      currentUser: INITIAL_STATE.currentUser,
      hasAgreement: INITIAL_STATE.hasAgreement,
      latestPurchase: INITIAL_STATE.latestPurchase,
      login: (user) => set(() => ({ currentUser: user })),
      logout: () => set(() => ({ currentUser: "", latestPurchase: "" })),
      setAgreement: (value) => set(() => ({ hasAgreement: value })),
      setLatestPurchase: (value) => set(() => ({ latestPurchase: value })),
    }),
    {
      name: "user-data",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
