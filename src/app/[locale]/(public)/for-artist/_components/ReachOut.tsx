import { ReachOutForm } from "@/app/[locale]/(public)/for-artist/_components/ReachOutForm";
import { useTranslations } from "next-intl";
import s from "./ReachOut.module.scss";

export function ReachOut() {
  const t = useTranslations("ForArtist");

  return (
    <div className={s.reachOutSection}>
      <div className={s.textWrapper}>
        <p className={s.title}>{t("form_title")}</p>
        <p className={s.description}>{t("form_description")}</p>
      </div>
      <ReachOutForm />
    </div>
  );
}
