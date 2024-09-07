import s from "@/app/[locale]/(public)/for-artist/ForArtist.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Cards() {
  const t = useTranslations("ForArtist");

  function Card(props: { name: string; title: string; desc: string }) {
    return (
      <div className={s.card}>
        <Image
          src={"/for-artist/" + props.name + ".svg"}
          alt={props.title}
          width={55}
          height={50}
        />
        <p className={s.card_title}>{props.title}</p>
        <p className={s.card_description}>{props.desc}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "60px 0",
      }}
    >
      <div className={s.cardsWrapper}>
        <Card
          name={"submit"}
          title={t("card1_title")}
          desc={t("card1_description")}
        />
        <Card
          name={"get"}
          title={t("card2_title")}
          desc={t("card2_description")}
        />
        <Card
          name={"start"}
          title={t("card3_title")}
          desc={t("card3_description")}
        />
      </div>
    </div>
  );
}
