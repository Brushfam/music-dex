import s from "@/app/[locale]/(public)/for-artist/ForArtist.module.scss";
import Image from "next/image";
import {useTranslations} from "next-intl";

export function Cards() {
  const t = useTranslations("ForArtist");

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      padding: "60px 0",
    }}>
      <div className={s.cardsWrapper}>
        <div className={s.card}>
          <Image
            src={"/for-artist/submit.svg"}
            alt={"submit"}
            width={55}
            height={50}
          />
          <p className={s.card_title}>{t("card1_title")}</p>
          <p className={s.card_description}>
            {t("card1_description")}
          </p>
        </div>
        <div className={s.card}>
          <Image
            src={"/for-artist/get.svg"}
            alt={"submit"}
            width={55}
            height={50}
          />
          <p className={s.card_title}>{t("card2_title")}</p>
          <p className={s.card_description}>
            {t("card2_description")}
          </p>
        </div>
        <div className={s.card}>
          <Image
            src={"/for-artist/start.svg"}
            alt={"submit"}
            width={55}
            height={50}
          />
          <p className={s.card_title}>{t("card3_title")}</p>
          <p className={s.card_description}>
            {t("card3_description")}
          </p>
        </div>
      </div>
    </div>
  );
}
