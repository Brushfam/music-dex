import s from "@/app/[locale]/(public)/for-artist/ForArtist.module.scss";
import Image from "next/image";

export function MainText() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "120px 0 60px 0",
      }}
    >
      <div className={s.mainText1}>
        <Image
          src={"/for-artist/text1.svg"}
          alt={"text"}
          width={1187}
          height={163}
        />
      </div>
      <div className={s.mainText2}>
        <Image
          src={"/for-artist/text2.svg"}
          alt={"text"}
          width={774}
          height={367}
        />
      </div>
      <div className={s.mainText3}>
        <Image
          src={"/for-artist/text3.svg"}
          alt={"text"}
          width={301}
          height={426}
        />
      </div>
    </div>
  );
}
