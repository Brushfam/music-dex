"use client";

import { PageList } from "@/app/[locale]/(private)/_components/PageList/PagesList";
import { ProfilePages } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import s from "./Sidebar.module.scss";

export function Sidebar(props: {
  currentPage: ProfilePages;
  setCurrentPage: Dispatch<SetStateAction<ProfilePages>>;
  role: string;
}) {
  function Logo() {
    return (
      <div className={s.logoWrapper}>
        <div className={s.logoBlock}>
          <Link href={"/"} className={s.logo}>
            <Image alt={"logo"} src={"/logos/MusicDex-logo.svg"} fill={true} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={s.sidebar}>
      <Logo />
      <PageList
        role={props.role}
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
      />
    </div>
  );
}
