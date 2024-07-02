import s from "@/app/[locale]/(public)/for-artist/ForArtist.module.scss";
import { Section } from "@/components/ui/Section/Section";
import Image from "next/image";

export function Cards() {
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
          <p className={s.card_title}>Submit your best song</p>
          <p className={s.card_description}>
            Interested in joining MusicDex community and starting your exciting
            journey with us? Fill out the form and our team of experts will
            review it.
          </p>
        </div>
        <div className={s.card}>
          <Image
            src={"/for-artist/get.svg"}
            alt={"submit"}
            width={55}
            height={50}
          />
          <p className={s.card_title}>Submit your best song</p>
          <p className={s.card_description}>
            Interested in joining MusicDex community and starting your exciting
            journey with us? Fill out the form and our team of experts will
            review it.
          </p>
        </div>
        <div className={s.card}>
          <Image
            src={"/for-artist/start.svg"}
            alt={"submit"}
            width={55}
            height={50}
          />
          <p className={s.card_title}>Submit your best song</p>
          <p className={s.card_description}>
            Interested in joining MusicDex community and starting your exciting
            journey with us? Fill out the form and our team of experts will
            review it.
          </p>
        </div>
      </div>
    </div>
  );
}
