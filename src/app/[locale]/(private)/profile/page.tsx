"use client";

import React, { useEffect, useState } from "react";
import { ProfilePages } from "@/types/types";
import s from "./Profile.module.scss";
import { Sidebar } from "@/app/[locale]/(private)/profile/_components/Sidebar/Sidebar";
import { CurrentArtistPage } from "@/app/[locale]/(private)/profile/CurrentArtistPage";
import { MobileHeader } from "@/app/[locale]/(private)/_components/MobileHeader";
import SideMenu from "@/app/[locale]/(private)/_components/SideMenu";

export default function Profile() {
  const [currentPage, setCurrentPage] = useState(ProfilePages.Overview);

  function CurrentProfile() {
    return <CurrentArtistPage currentPage={currentPage} />
  }

  return (
    <div>
      <MobileHeader>
        <SideMenu
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </MobileHeader>
      <div className={s.profileLayout}>
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <CurrentProfile />
      </div>
    </div>
  );
}
