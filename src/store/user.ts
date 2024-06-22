import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  currentUserName: string;
  currentUserEmail: string;
  currentUserRole: string;
  profilePage: string;
}

interface Actions {
  setCurrentUserEmail: (email: string) => void;
  login: (name: string, email: string, role: string) => void;
  logout: () => void;
  changeProfilePage: (page: string) => void;
}

const INITIAL_STATE: State = {
  currentUserName: "",
  currentUserEmail: "",
  currentUserRole: "",
  profilePage: "",
};

// Use only for client components
export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      currentUserName: INITIAL_STATE.currentUserName,
      currentUserEmail: INITIAL_STATE.currentUserEmail,
      currentUserRole: INITIAL_STATE.currentUserRole,
      profilePage: INITIAL_STATE.profilePage,
      setCurrentUserEmail: (email) => set(() => ({ currentUserEmail: email })),
      login: (name, email, role) =>
        set(() => ({
          currentUserName: name,
          currentUserEmail: email,
          currentUserRole: role,
        })),
      logout: () =>
        set(() => ({
          currentUserName: "",
          currentUserEmail: "",
          currentUserRole: "",
        })),
      changeProfilePage: (page) => set(() => ({ profilePage: page })),
    }),
    {
      name: "user-data",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
