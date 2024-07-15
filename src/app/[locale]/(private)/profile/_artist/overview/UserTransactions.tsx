import s from "./Overview.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function UserTransactions() {
  const t = useTranslations("ProfileArtist.Overview");
  return (
    <div className={s.statisticsBlock}>
      <p className={s.title}>{t("transactions_title")}</p>
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
          src={"/profile/empty-list/statistics.svg"}
          alt={"icon"}
          width={50}
          height={50}
        />
        <p className={s.statisticsBlock_text1}>
          {t("empty_transactions_list")}
        </p>
      </div>
    </div>
  );
}
