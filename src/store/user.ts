import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  currentUserName: string;
  currentUserEmail: string;
  currentUserRole: string;
  orderLink: string;
}

interface Actions {
  setCurrentUserEmail: (email: string) => void;
  setOrderLink: (orderUrl: string) => void;
}

const INITIAL_STATE: State = {
  currentUserName: "",
  currentUserEmail: "",
  currentUserRole: "",
  orderLink: "",
};

// Use only for client components
export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      currentUserName: INITIAL_STATE.currentUserName,
      currentUserEmail: INITIAL_STATE.currentUserEmail,
      currentUserRole: INITIAL_STATE.currentUserRole,
      orderLink: INITIAL_STATE.orderLink,
      setCurrentUserEmail: (email) => set(() => ({ currentUserEmail: email })),
      setOrderLink: (orderUrl) => set(() => ({ orderLink: orderUrl })),
    }),
    {
      name: "user-data",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
