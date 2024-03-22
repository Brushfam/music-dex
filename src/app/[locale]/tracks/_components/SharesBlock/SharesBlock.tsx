import s from "./SharesBlock.module.scss";
import { useTranslations } from "next-intl";

export function SharesBlock() {
  const t = useTranslations("Dealer");

  return (
    <div className={s.sharesBlock}>
      <p className={s.title}>Token sales</p>
      <button type={"button"} className={s.disabledButton}>
          {t("shares_block_title")}
      </button>
        <p className={s.tip}>{t("shares_block_description")}</p>
    </div>
  );
}
