import { SocialMedia } from "@/components/Footer/SocialMedia";
import { useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import Image from "next/image";
import Link from "next/link";
import s from "./Footer.module.scss";

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
              <p>{t("email_title")}</p>
            </div>
            <div className={s.emailBlock}>
              <p>{t("main_email")}</p>
              <a
                href={"mailto:musicdex.inc@gmail.com"}
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                musicdex.inc@gmail.com
              </a>
            </div>
            <div className={s.emailBlock}>
              <p>{t("support_email")}</p>
              <a
                href={"mailto:support@musicdex.co"}
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                support@musicdex.co
              </a>
            </div>
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
      <div className={s.weAcceptBlock}>
        <p>{t("we_accept")}</p>
        <Link
          href={"https://whitepay.com/"}
          target={"_blank"}
          style={{ position: "relative", width: 30, height: 30 }}
        >
          <Image src={"/logos/whitepay.png"} alt={"whitepay"} fill={true} />
        </Link>
      </div>
    </div>
  );
}
