"use client";

import s from "./Header.module.scss";
import cs from "../../app/commonStyles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Login } from "@/components/Header/Login";
import { useLocale } from "use-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useUserStore } from "@/store/user";
import { LogoutButton } from "@/components/Header/Logout";
import { useTranslations } from "next-intl";
import React, {useEffect} from "react";
import SideMenu from "@/components/MobileHeader/SideMenu";

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

export function Header() {
  const currentUser = useUserStore((state) => state.currentUserEmail);
  const currentLocale = useLocale();

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser]);

  return (
    <div className={s.header}>
      <div className={s.header_content}>
        <div className={s.menuWrapper}>
          <Link href={"/"} className={s.header_logo}>
            <Image alt={"logo"} src={"/logos/MusicDex-logo.svg"} fill={true} />
          </Link>
          <div className={s.menu}>
            <Link href={"/" + currentLocale + "/catalog"}>Catalog</Link>
            <Link href={"/" + currentLocale + "/for-artist"}>For artist</Link>
            <Link href={"/" + currentLocale + "/faq"}>FAQ</Link>
          </div>
        </div>
        {currentUser ? (
          <div className={s.header_row}>
            <LangSwitcher />
            <ProfileButton />
            <div className={s.desktop}>
              <LogoutButton />
            </div>
            <div className={s.mobile}>
              <SideMenu currentUser={currentUser}/>
            </div>
          </div>
        ) : (
          <div className={s.header_row}>
            <LangSwitcher />
            <Login />
            <div className={s.mobile}>
              <SideMenu currentUser={currentUser}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
