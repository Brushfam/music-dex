import s from "./Footer.module.scss";
import Image from "next/image";
import {SocialMedia} from "@/components/Footer/SocialMedia";
import {createSharedPathnamesNavigation} from "next-intl/navigation";
import {useTranslations} from "next-intl";

export function Footer() {
  const { Link: LocalLink } = createSharedPathnamesNavigation({
    locales: ["en", "uk"],
  });
  const t = useTranslations("Footer");

  return (
    <div className={s.footerSection} id={"footer"}>
      <div className={s.columnContainer}>
        <Image
          alt={"logo"}
          src={"/logos/MusicDex-logo.svg"}
          width={200}
          height={43}
        />
        <p className={s.footerMainText}>
          {t("description")}
        </p>
      </div>
      <div className={s.linksBlock}>
        <SocialMedia/>
        <div className={s.linksColumn}>
          <p style={{ marginBottom: 6 }}>{t("email")}</p>
          <a href={"mailto:markian@musicdex.co"} target="_blank">markian@musicdex.co</a>
        </div>
        <div className={s.linksColumn}>
          <p style={{marginBottom: 6}}>{t("other")}</p>
          <LocalLink href={"/documents/privacy-policy"}>{t("privacy_policy")}</LocalLink>
          <LocalLink href={"/documents/terms-and-conditions"}>{t("terms")}</LocalLink>
          <LocalLink href={"/documents/public-offer"}>{t("public_offer")}</LocalLink>
        </div>
      </div>
    </div>
  );
}
