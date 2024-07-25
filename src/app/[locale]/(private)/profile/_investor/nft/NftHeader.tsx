import s from "./NFTs.module.scss";
import { useTranslations } from "next-intl";

export function NftHeader() {
  const t = useTranslations("ProfileInvestor.NFTs");

  return (
    <div className={s.nftHeader}>
      <p className={s.nftHeader_date}>{t("date")}</p>
      <p className={s.nftHeader_item}>{t("item")}</p>
      <p className={s.nftHeader_name}>{t("name")}</p>
      <p className={s.nftHeader_amount}>{t("amount")}</p>
      <p className={s.nftHeader_description}>{t("description")}</p>
    </div>
  );
}
