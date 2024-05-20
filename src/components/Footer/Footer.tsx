import s from "./Footer.module.scss";
import Image from "next/image";
import { SocialMedia } from "@/components/Footer/SocialMedia";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Footer() {
  const { Link: LocalLink } = createSharedPathnamesNavigation({
    locales: ["en", "uk"],
  });
  const t = useTranslations("Footer");

  return (
    <div className={s.footerWrapper}>
      <footer className={s.footerSection} id={"footer"}>
        <div className={s.columnContainer}>
          <Link href={"/"} style={{ display: "block" }}>
            <Image
              alt={"logo"}
              src={"/logos/MusicDex-logo.svg"}
              width={200}
              height={43}
            />
          </Link>
          <p className={s.footerMainText}>{t("description")}</p>
        </div>
        <div className={s.linksBlock}>
          <SocialMedia />
          <div className={s.linksColumn}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 6,
                alignItems: "center",
              }}
            >
              <Image
                src={"/icons/email-footer.svg"}
                alt={"email"}
                width={18}
                height={18}
                style={{ marginRight: 6 }}
              />
              <p>{t("email")}</p>
            </div>
            <a
              href={"mailto:musicdex.inc@gmail.com"}
              target="_blank"
              style={{ textDecoration: "underline" }}
            >
              musicdex.inc@gmail.com
            </a>
          </div>
          <div className={s.linksColumn}>
            <p style={{ marginBottom: 6 }}>{t("legal")}</p>
            <LocalLink href={"/documents/privacy-policy"}>
              {t("privacy_policy")}
            </LocalLink>
            <LocalLink href={"/documents/terms-and-conditions"}>
              {t("terms")}
            </LocalLink>
            <LocalLink href={"/documents/public-offer"}>
              {t("public_offer")}
            </LocalLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
