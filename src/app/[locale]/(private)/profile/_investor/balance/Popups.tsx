import { TopUpStepEnum, useBalanceStore } from "@/store/balance";
import { ReplenishPopup } from "./ReplenishPopup";
import { TopUpPopup } from "./TopUpPopup";
import WithdrawPopup from "./WithdrawPopup";

const Popups = () => {
  const { topUpStep } = useBalanceStore();

  switch (topUpStep) {
    case TopUpStepEnum.CHOICE:
      return <TopUpPopup />;
    case TopUpStepEnum.REPLENISH:
      return <ReplenishPopup />;
    case TopUpStepEnum.WITHDRAW:
      return <WithdrawPopup />;

    default:
      return null;
  }
};

export default Popups;
