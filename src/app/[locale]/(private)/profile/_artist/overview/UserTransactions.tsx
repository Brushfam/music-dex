import s from "./Overview.module.scss";
import Image from "next/image";

export function UserTransactions() {
  return (
    <div className={s.statisticsBlock}>
      <p className={s.title}>Users’ transactions </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
            width: "100%",
            height: "100%"
        }}
      >
        <Image
          src={"/profile/empty-list/statistics.svg"}
          alt={"icon"}
          width={50}
          height={50}
        />
        <p className={s.statisticsBlock_text1}>
          The history of user&#39;s purchases will be shown here
        </p>
      </div>
    </div>
  );
}
