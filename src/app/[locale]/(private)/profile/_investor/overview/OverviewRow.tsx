import s from "./Overview.module.scss";
import Image from "next/image";

export function OverviewRow(props: {
  totalInvestedAmount: number;
  totalTokensAmount: number;
}) {
  return (
    <div className={s.overviewRow}>
      <div className={s.overviewItem}>
        <div className={s.overviewItem_column}>
          <p className={s.overviewItem_text1}>Earned from royalties</p>
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
          <p className={s.overviewItem_text1}>Total songs invested</p>
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
      <div className={s.overviewItem}>
        <div className={s.overviewItem_column}>
          <p className={s.overviewItem_text1}>Invested amount</p>
          <p className={s.overviewItem_text2}>{props.totalInvestedAmount}</p>
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
          <p className={s.overviewItem_text1}>Total token amount</p>
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
  );
}
