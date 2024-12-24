import { Legal } from "@/components/Footer/Legal";
import { socialMediaData } from "@/data/components/socialMediaData";
import { handleContactPixelEvent } from "@/services/pixel";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import s from "./Footer.module.scss";

export function Footer() {
  const t = useTranslations("Footer");

  function SocialMedia() {
    return (
      <div className={s.linksColumn}>
        <p style={{ marginBottom: 6 }}>{t("social_media")}</p>
        <div className={s.mediaWrapper}>
          {socialMediaData.map((media, index) => {
            return (
              <a
                href={media.link}
                target="_blank"
                key={index.toString()}
                onClick={() => {
                  handleContactPixelEvent(media.name);
                }}
              >
                <div className={s.mediaDesktop}>
                  {media.desktopImage}
                  <p>{media.name}</p>
                </div>
                <div className={s.mediaMobile}>{media.mobileImage}</div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  function EmailContacts() {
    return (
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
            onClick={() => {
              handleContactPixelEvent("musicdex.inc@gmail.com");
            }}
          >
            musicdex.inc@gmail.com
          </a>
        </div>
      </div>
    );
  }

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
          <div className={s.linksRowBlock}>
            <SocialMedia />
            <EmailContacts />
          </div>
          <Legal />
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
