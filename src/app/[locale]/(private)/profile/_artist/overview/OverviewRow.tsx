import s from "./Overview.module.scss";
import Image from "next/image";
import {useTranslations} from "next-intl";

export function OverviewRow() {
  const t = useTranslations("ProfileArtist.Overview");
  return (
    <div className={s.overviewRow}>
      <div className={s.overviewItem}>
        <div className={s.overviewItem_column}>
          <p className={s.overviewItem_text1}>{t("overview_block1")}</p>
          <p className={s.overviewItem_text2}>0.00</p>
        </div>
        <Image
          src={"/profile/overview/total-tokens.svg"}
          alt={"earned"}
          height={25}
          width={25}
        />
      </div>
      <div className={s.overviewSubRow}>
        <div className={s.overviewItem}>
          <div className={s.overviewItem_column}>
            <p className={s.overviewItem_text1}>{t("overview_block2")}</p>
            <p className={s.overviewItem_text2}>$0.00</p>
          </div>
          <Image
            src={"/profile/overview/total-invested.svg"}
            alt={"earned"}
            height={25}
            width={25}
          />
        </div>
        <div className={s.overviewItem}>
          <div className={s.overviewItem_column}>
            <p className={s.overviewItem_text1}>{t("overview_block3")}</p>
            <p className={s.overviewItem_text2}>$0.00</p>
          </div>
          <Image
            src={"/profile/overview/earned.svg"}
            alt={"earned"}
            height={25}
            width={25}
          />
        </div>
      </div>
    </div>
  );
}
