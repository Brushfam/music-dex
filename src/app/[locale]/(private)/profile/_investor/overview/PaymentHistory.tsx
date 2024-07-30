import s from "./Overview.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function PaymentHistory() {
  const t = useTranslations("ProfileInvestor.Overview");

  return (
    <div className={s.statisticsBlock}>
      <p className={s.title}>{t("payment_history")}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={"/profile/empty-list/payment-history.svg"}
          alt={"icon"}
          width={38}
          height={48}
        />
        <p className={s.statisticsBlock_text1}>{t("empty_history_title")}</p>
        <p className={s.statisticsBlock_text2}>{t("empty_history_desc")}</p>
      </div>
    </div>
  );
}
