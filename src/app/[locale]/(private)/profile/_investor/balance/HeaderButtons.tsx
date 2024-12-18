import { Button } from "@/components/ui/Button/Button";
import { TopUpStepEnum, useBalanceStore } from "@/store/balance";
import { useTranslations } from "next-intl";
import s from "./Balance.module.scss";

export const HeaderButtons = ({ balanceList ,investBalance}: any) => {
  const { setTopUpStep, setBalanceList,setInvestBalance } = useBalanceStore();
  const t = useTranslations("ProfileInvestor.Balance");

  return (
    <div className={s.headerButtons}>
      <Button
        color="main"
        arrow={false}
        title={t("topUp")}
        action={() => setTopUpStep(TopUpStepEnum.CHOICE)}
      />
      <Button
        action={() => {
          setTopUpStep(TopUpStepEnum.WITHDRAW);
          setBalanceList(balanceList);
          setInvestBalance(investBalance);
        }}
        color="grey"
        arrow={true}
        title={t("withdraw")}
      />
    </div>
  );
};
