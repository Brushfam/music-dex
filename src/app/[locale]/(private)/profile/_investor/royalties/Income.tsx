import s from "./Royalties.module.scss";
import Image from "next/image";

export function Income() {
  return (
    <div className={s.income}>
      <p className={s.title}>Statistics</p>
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
          src={"/profile/empty-list/income-data.svg"}
          alt={"icon"}
          width={50}
          height={50}
        />
        <p className={s.text1}>
          Your income data will be shown here
        </p>
        <p className={s.text2}>Choose a song to invest</p>
      </div>
    </div>
  );
}
