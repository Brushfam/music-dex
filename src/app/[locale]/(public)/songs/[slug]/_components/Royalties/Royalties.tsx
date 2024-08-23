import { useTranslations } from "next-intl";
import Image from "next/image";
import s from "./Royalties.module.scss";

export function Royalties() {
  const t = useTranslations("Tracks.Royalties");

  // we will use getSongRoyalties in future

  return (
    <div className={s.royalties}>
      <p className={s.title}>{t("title")}</p>
      <div className={s.history}>
        <Image
          src={"/profile/empty-list/statistics.svg"}
          alt={"icon"}
          width={50}
          height={50}
        />
        <p className={s.noRoyalties}>{t("no_history")}</p>
      </div>
    </div>
  );
}
