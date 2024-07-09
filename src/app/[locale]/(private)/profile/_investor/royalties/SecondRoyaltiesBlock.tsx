import s from "./Royalties.module.scss";
import Image from "next/image";
import {useTranslations} from "next-intl";

export function SecondRoyaltiesBlock() {
    const t = useTranslations("ProfileInvestor.Royalties")
  return (
    <div className={s.secondBlockRow}>
      <div className={s.secondBlock}>
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
            style={{marginBottom: 4}}
          />
          <p className={s.text1}>
              {t("empty_history_title")}
          </p>
          <p className={s.text2}>{t("empty_history_desc")}</p>
        </div>
      </div>
      <div className={s.secondBlock}>
        <p className={s.title}>{t("future_payouts")}</p>
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
            src={"/profile/empty-list/future-payouts.svg"}
            alt={"icon"}
            width={38}
            height={48}
          />
          <p className={s.text1}>
              {t("empty_payouts_title")}
          </p>
          <p className={s.text2}>
              {t("empty_payouts_desc")}
          </p>
        </div>
      </div>
    </div>
  );
}
