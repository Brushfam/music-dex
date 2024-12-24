import { TopUpStepEnum, useBalanceStore } from "@/store/balance";
import { ReplenishPopup } from "./ReplenishPopup";
import { TopUpPopup } from "./TopUpPopup";
import WithdrawPopup from "./WithdrawPopup";

const Popups = ({ handleGetBalances }: { handleGetBalances: () => void }) => {
  const { topUpStep } = useBalanceStore();

  switch (topUpStep) {
    case TopUpStepEnum.CHOICE:
      return <TopUpPopup />;
    case TopUpStepEnum.REPLENISH:
      return <ReplenishPopup handleGetBalances={handleGetBalances} />;
    case TopUpStepEnum.WITHDRAW:
      return <WithdrawPopup handleGetBalances={handleGetBalances} />;

    default:
      return null;
  }
};

export default Popups;
