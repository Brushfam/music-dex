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
  investBalance: {};
}

interface Actions {
  setTopUpStep: (topUpStep: TopUpStepEnum | null) => void;
  setTopUpMethod: (method: TopUpMethodEnum | null) => void;
  setBalanceList: (balanceList: TopUpMethodEnum[]) => void;
  setInvestBalance: (balanceList: TopUpMethodEnum[]) => void;
}

const INITIAL_STATE: State = {
  topUpStep: null,
  method: null,
  balanceList: [],
  investBalance: {},
};

export const useBalanceStore = create<State & Actions>((set) => ({
  topUpStep: INITIAL_STATE.topUpStep,
  method: INITIAL_STATE.method,
  balanceList: INITIAL_STATE.balanceList,
  investBalance: INITIAL_STATE.investBalance,
  setTopUpStep: (topUpStep) => set({ topUpStep }),
  setTopUpMethod: (method) => set({ method }),
  setBalanceList: (balanceList) => set({ balanceList }),
  setInvestBalance: (investBalance) => set({ investBalance }),
}));
