import { useTranslations } from "next-intl";
import Image from "next/image";
import s from "./Overview.module.scss";

export function RoyaltiesHistory() {
  const t = useTranslations("ProfileArtist.Overview");
  return (
    <div className={s.royaltiesHistory}>
      <p className={s.title}>{t("royalty_title")}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={"/profile/empty-list/payment-history.svg"}
          alt={"icon"}
          width={38}
          height={48}
        />
        <p className={s.royaltiesHistory_text1}>
          {t("empty_royalties_history")}
        </p>
      </div>
    </div>
  );
}
