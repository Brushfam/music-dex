"use client";

import { Login } from "@/components/Header/Login";
import { LogoutButton } from "@/components/Header/Logout";
import SideMenu from "@/components/MobileHeader/SideMenu";
import { useUserStore } from "@/store/user";
import { useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLocale } from "use-intl";
import cs from "../../app/commonStyles.module.scss";
import s from "./Header.module.scss";

function ProfileButton() {
  const currentLocale = useLocale();
  const t = useTranslations("Header");

  return (
    <Link href={"/" + currentLocale + "/profile"} className={cs.headerButton}>
      <div className={s.mediaWrapper}>
        <p>{t("profile")}</p>
        <Image
          src={"/profile/icons/profile.svg"}
          alt={"logout"}
          width={14}
          height={18}
        />
      </div>
    </Link>
  );
}

function LangSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const { Link: LocalLink } = createSharedPathnamesNavigation({
    locales: ["en", "uk"],
  });

  return (
    <LocalLink
      href={pathname.substring(3) || "/"}
      locale={currentLocale == "en" ? "uk" : "en"}
      className={cs.headerButton}
      style={{ minWidth: 0 }}
    >
      <p>{currentLocale.toUpperCase()}</p>
    </LocalLink>
  );
}

function HeaderSocialLinks() {
  return (
    <div className={s.header_social_links}>
      <a href="https://www.instagram.com/musicdex.inc/" target="_blank">
        <Image
          src="/icons/social-media/inst-mobile.svg"
          alt="instagram logo"
          width={24}
          height={24}
        />
      </a>
      <a
        href="https://youtube.com/@musicdex.?si=FXjAQGaWki_HZHQ7"
        target="_blank"
      >
        <Image
          src="/icons/social-media/youtube-mobile.svg"
          alt="youtube logo"
          width={24}
          height={24}
        />
      </a>
      <a href="https://x.com/MusicDex_inc" target="_blank">
        <Image
          src="/icons/social-media/twitter-mobile.svg"
          alt="youtube logo"
          width={24}
          height={24}
        />
      </a>
      <a href="https://www.tiktok.com/@music.dex?lang=ru-RU" target="_blank">
        <Image
          src="/icons/social-media/tt-mobile.svg"
          alt="TikTok logo"
          width={24}
          height={24}
        />
      </a>
      <a href="https://t.me/musicdexplatform" target="_blank">
        <Image
          src="/icons/social-media/telegram-mobile.svg"
          alt="Telegram logo"
          width={24}
          height={24}
        />
      </a>
    </div>
  );
}

export function Header() {
  const currentUser = useUserStore((state) => state.currentUserEmail);
  const currentLocale = useLocale();
  const t = useTranslations("Header");

  useEffect(() => {}, [currentUser]);

  return (
    <header className={s.header}>
      <div className={s.header_content}>
        <div className={s.menuWrapper}>
          <Link href={"/"} className={s.header_logo}>
            <Image alt={"logo"} src={"/logos/MusicDex-logo.svg"} fill={true} />
          </Link>
          <div className={s.menu}>
            <Link href={"/" + currentLocale + "/songs"}>{t("catalog")}</Link>
            <Link href={"/" + currentLocale + "/for-artist"}>
              {t("for_artist")}
            </Link>
            <Link href={"/" + currentLocale + "/blog"}>{t("blog")}</Link>
            {/* <Link href={"/" + currentLocale + "/gallery"}>{t("gallery")}</Link> */}
            <Link href={"/" + currentLocale + "/faq"}>FAQ</Link>
          </div>
        </div>
        {currentUser ? (
          <div className={s.header_row}>
            <HeaderSocialLinks />
            <LangSwitcher />
            <ProfileButton />
            <div className={s.desktop}>
              <LogoutButton />
            </div>
            <div className={s.mobile}>
              <SideMenu currentUser={currentUser} />
            </div>
          </div>
        ) : (
          <div className={s.header_row}>
            <HeaderSocialLinks />
            <LangSwitcher />
            <Login />
            <div className={s.mobile}>
              <SideMenu currentUser={currentUser} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
