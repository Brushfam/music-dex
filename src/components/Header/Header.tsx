"use client";
import s from "./Header.module.scss";
import cs from "../../app/commonStyles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UseDocs } from "@/context/DocsContext";

function DocsLangSwitcher() {
  const pathname = usePathname();
  const docsContext = UseDocs();

  function getCurrentLang() {
    return docsContext.lang === null ? "EN" : docsContext.lang;
  }

  function handleSwitch() {
    if (getCurrentLang() === "EN") {
      docsContext.setLang("UA");
    } else {
      docsContext.setLang("EN");
    }
  }

  return pathname.includes("/documents/terms") ||
    pathname.includes("/documents/public-offer") ? (
    <button
      className={cs.headerButton}
      onClick={() => {
        handleSwitch();
      }}
    >
      <p>{getCurrentLang()}</p>
    </button>
  ) : null;
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
        <DocsLangSwitcher />
      </div>
    </div>
  );
}
