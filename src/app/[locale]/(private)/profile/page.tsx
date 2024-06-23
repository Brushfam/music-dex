"use client";
import { useState } from "react";
import { ProfilePages } from "@/types/types";
import s from "./Profile.module.scss";
import { Sidebar } from "@/app/[locale]/(private)/profile/_components/Sidebar/Sidebar";
import Settings from "@/app/[locale]/(private)/profile/Settings";
import Songs from "@/app/[locale]/(private)/profile/Songs";

export default function Profile() {
  const [currentPage, setCurrentPage] = useState(ProfilePages.Settings);

  function CurrentProfilePage() {
    switch (currentPage) {
      case ProfilePages.Songs:
        return <Songs/>;
      case ProfilePages.Settings:
        return <Settings />;
      default:
        return <Settings />;
    }
  }

  return (
    <div className={s.profileLayout}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CurrentProfilePage />
    </div>
  );
}
