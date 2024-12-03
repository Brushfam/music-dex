import { create } from "zustand";

export enum TopUpStepEnum {
  CHOICE,
  REPLENISH,
}

export enum TopUpMethodEnum {
  WALLET = "wallet",
  WHITEPAY = "whitepay",
}

interface State {
  topUpStep: TopUpStepEnum | null;
  method: TopUpMethodEnum | null;
}

interface Actions {
  setTopUpStep: (topUpStep: TopUpStepEnum | null) => void;
  setTopUpMethod: (method: TopUpMethodEnum | null) => void;
}

const INITIAL_STATE: State = {
  topUpStep: null,
  method: null,
};

export const useBalanceStore = create<State & Actions>((set) => ({
  topUpStep: INITIAL_STATE.topUpStep,
  method: INITIAL_STATE.method,
  setTopUpStep: (topUpStep) => set({ topUpStep }),
  setTopUpMethod: (method) => set({ method }),
}));
