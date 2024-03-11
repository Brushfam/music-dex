"use client";
import s from "./Header.module.scss";
import cs from "../../app/commonStyles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "use-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

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
    >
      <p>{currentLocale.toUpperCase()}</p>
    </LocalLink>
  );
}

export function Header() {
  return (
    <div className={s.header}>
      <div className={s.header_content}>
        <Link href={"/"} style={{ display: "block", width: 141 }}>
          <Image
            alt={"logo"}
            src={"/logos/MusicDex-logo.svg"}
            width={141}
            height={32}
          />
        </Link>
        <LangSwitcher />
      </div>
    </div>
  );
}
