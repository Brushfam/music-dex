import { BrushfamLogo } from "@/app/[locale]/(public)/_components/Partners/BrushfamLogo";
import { IncryptedLogo } from "@/app/[locale]/(public)/_components/Partners/IncryptedLogo";
import { WhitepayLogo } from "@/app/[locale]/(public)/_components/Partners/WhitepayLogo";
import { useTranslations } from "next-intl";
import Link from "next/link";
import s from "./Partners.module.scss";

export function Partners() {
  const t = useTranslations("Home");

  return (
    <div className={s.section}>
      <p className={s.title}>{t("partners")}</p>
      <div className={s.partners}>
        <Link href={"https://brushfam.io/"} target={"_blank"}>
          <BrushfamLogo />
        </Link>
        <div className={s.lastRow}>
          <Link href={"https://incrypted.com/en/"} target={"_blank"}>
            <IncryptedLogo />
          </Link>
          <Link href={"https://whitepay.com/"} target={"_blank"}>
            <WhitepayLogo />
          </Link>
        </div>
      </div>
    </div>
  );
}
