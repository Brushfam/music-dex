import { create } from "zustand";

export enum TopUpStepEnum {
  CHOICE,
  REPLENISH,
  WITHDRAW,
}

export enum TopUpMethodEnum {
  WALLET = "wallet",
  WHITEPAY = "whitepay",
}

interface State {
  topUpStep: TopUpStepEnum | null;
  method: TopUpMethodEnum | null;
  balanceList: any[];
}

interface Actions {
  setTopUpStep: (topUpStep: TopUpStepEnum | null) => void;
  setTopUpMethod: (method: TopUpMethodEnum | null) => void;
  setBalanceList: (balanceList: TopUpMethodEnum[]) => void;
}

const INITIAL_STATE: State = {
  topUpStep: null,
  method: null,
  balanceList: [],
};

export const useBalanceStore = create<State & Actions>((set) => ({
  topUpStep: INITIAL_STATE.topUpStep,
  method: INITIAL_STATE.method,
  balanceList: INITIAL_STATE.balanceList,
  setTopUpStep: (topUpStep) => set({ topUpStep }),
  setTopUpMethod: (method) => set({ method }),
  setBalanceList: (balanceList) => set({ balanceList }),
}));
