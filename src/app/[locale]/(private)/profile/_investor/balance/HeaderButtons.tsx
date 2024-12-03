import { Button } from "@/components/ui/Button/Button";
import { TopUpStepEnum, useBalanceStore } from "@/store/balance";
import s from "./Balance.module.scss";

export const HeaderButtons = () => {
  const { setTopUpStep } = useBalanceStore();
  return (
    <div className={s.headerButtons}>
      <Button
        color="main"
        arrow={false}
        title="Top up your balance"
        action={() => setTopUpStep(TopUpStepEnum.CHOICE)}
      />
      <Button color="grey" arrow={true} title="Withdraw" />
    </div>
  );
};
