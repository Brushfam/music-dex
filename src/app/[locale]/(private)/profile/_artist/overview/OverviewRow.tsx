import s from "./Overview.module.scss";
import Image from "next/image";

export function OverviewRow() {
  return (
    <div className={s.overviewRow}>
      <div className={s.overviewItem}>
        <div className={s.overviewItem_column}>
          <p className={s.overviewItem_text1}>Tokens purchased by listeners’</p>
          <p className={s.overviewItem_text2}>612.05</p>
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
            <p className={s.overviewItem_text1}>Listeners’ invested</p>
            <p className={s.overviewItem_text2}>$8,281.44</p>
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
            <p className={s.overviewItem_text1}>Royalties paid</p>
            <p className={s.overviewItem_text2}>$1019.00</p>
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
