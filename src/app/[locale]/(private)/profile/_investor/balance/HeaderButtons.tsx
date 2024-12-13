import { Button } from "@/components/ui/Button/Button";
import { TopUpStepEnum, useBalanceStore } from "@/store/balance";
import { useTranslations } from "next-intl";
import s from "./Balance.module.scss";

export const HeaderButtons = ({ balanceList }: any) => {
  const { setTopUpStep, setBalanceList } = useBalanceStore();
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
          balanceList;
        }}
        color="grey"
        arrow={true}
        title={t("withdraw")}
      />
    </div>
  );
};
