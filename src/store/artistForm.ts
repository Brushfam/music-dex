import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const LOCAL_STORAGE_VERSION_KEY = "local-storage-version";
const CURRENT_VERSION = "0.1.0";

function checkStorageVersion() {
  if (typeof window !== "undefined") {
    const storedVersion = localStorage.getItem(LOCAL_STORAGE_VERSION_KEY);

    if (storedVersion !== CURRENT_VERSION) {
      localStorage.clear();
      localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, CURRENT_VERSION);
    }
  }
}
checkStorageVersion();

interface FormStore {
  artistFormStep: string;
  setArtistFormStep: (value: string) => void;
}

// Use only for client components
export const useArtistFormStore = create<FormStore>()(
  persist(
    (set) => ({
      artistFormStep: "",
      setArtistFormStep: (step: string) => set({ artistFormStep: step }),
    }),
    {
      name: "artist-form-step",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
