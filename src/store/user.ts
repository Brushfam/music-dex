import { IBalance } from "@/types/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  currentUserName: string;
  currentUserEmail: string;
  orderLink: string; // for tracks pages, triggers ApprovePurchase modal window
  noWalletsModal: string; // for tracks pages, triggers NoWallets modal window
  payAccountModal: string;
  balances: IBalance[];
}

interface Actions {
  setCurrentUserEmail: (email: string) => void;
  setCurrentUserName: (name: string) => void;
  setOrderLink: (orderUrl: string) => void;
  setNoWalletsModal: (value: string) => void;
  setPayAccountModal: (value: string) => void;
  setBalances: (value: IBalance[]) => void;
}

const INITIAL_STATE: State = {
  currentUserName: "",
  currentUserEmail: "",
  orderLink: "",
  noWalletsModal: "",
  payAccountModal: "",
  balances: [],
};

// Use only for client components
export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      currentUserName: INITIAL_STATE.currentUserName,
      currentUserEmail: INITIAL_STATE.currentUserEmail,
      orderLink: INITIAL_STATE.orderLink,
      noWalletsModal: INITIAL_STATE.noWalletsModal,
      payAccountModal: INITIAL_STATE.payAccountModal,
      balances: INITIAL_STATE.balances,
      setBalances: (value) => set(() => ({ balances: value })),
      setCurrentUserEmail: (email) => set(() => ({ currentUserEmail: email })),
      setCurrentUserName: (name) => set(() => ({ currentUserName: name })),
      setOrderLink: (orderUrl) => set(() => ({ orderLink: orderUrl })),
      setNoWalletsModal: (value) => set(() => ({ noWalletsModal: value })),
      setPayAccountModal: (value) => set(() => ({ payAccountModal: value })),
    }),
    {
      name: "user-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
