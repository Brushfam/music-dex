import s from "./Overview.module.scss";
import Image from "next/image";
import {useTranslations} from "next-intl";

export function OverviewRow(props: {
  totalInvestedAmount: number;
  totalTokensAmount: number;
}) {
  const t = useTranslations("ProfileInvestor.Overview");

  return (
    <div className={s.overviewRow}>
      <div className={s.overviewSubRow}>
        <div className={s.overviewItem}>
          <div className={s.overviewItem_column}>
            <p className={s.overviewItem_text1}>{t("earned")}</p>
            <p className={s.overviewItem_text2}>$0.00</p>
          </div>
          <Image
            src={"/profile/overview/earned.svg"}
            alt={"earned"}
            height={25}
            width={25}
          />
        </div>
        <div className={s.overviewItem}>
          <div className={s.overviewItem_column}>
            <p className={s.overviewItem_text1}>{t("total_songs")}</p>
            <p className={s.overviewItem_text2}>
              {props.totalInvestedAmount ? "1" : "0"}
            </p>
          </div>
          <Image
            src={"/profile/overview/total-songs.svg"}
            alt={"songs"}
            height={25}
            width={20}
          />
        </div>
      </div>
      <div className={s.overviewSubRow}>
        <div className={s.overviewItem}>
          <div className={s.overviewItem_column}>
            <p className={s.overviewItem_text1}>{t("invested_amount")}</p>
            <p className={s.overviewItem_text2}>${props.totalInvestedAmount}</p>
          </div>
          <Image
            src={"/profile/overview/total-invested.svg"}
            alt={"invested"}
            height={23}
            width={27}
          />
        </div>
        <div className={s.overviewItem}>
          <div className={s.overviewItem_column}>
            <p className={s.overviewItem_text1}>{t("total_tokens")}</p>
            <p className={s.overviewItem_text2}>{props.totalTokensAmount}</p>
          </div>
          <Image
            src={"/profile/overview/total-tokens.svg"}
            alt={"earned"}
            height={26}
            width={23}
          />
        </div>
      </div>
    </div>
  );
}
