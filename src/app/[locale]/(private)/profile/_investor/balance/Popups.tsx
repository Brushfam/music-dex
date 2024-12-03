import { TopUpStepEnum, useBalanceStore } from "@/store/balance";
import { ReplenishPopup } from "./ReplenishPopup";
import { TopUpPopup } from "./TopUpPopup";

const Popups = () => {
  const { topUpStep } = useBalanceStore();

  switch (topUpStep) {
    case TopUpStepEnum.CHOICE:
      return <TopUpPopup />;
    case TopUpStepEnum.REPLENISH:
      return <ReplenishPopup />;
    default:
      return null;
  }
};

export default Popups;
