import { LoadingSpinner } from "@/app/[locale]/(private)/_components/LoadingSpinner";
import { ProfileHeader } from "@/app/[locale]/(private)/_components/ProfileHeader/ProfileHeader";
import s from "@/app/[locale]/(private)/profile/Profile.module.scss";
import React from "react";

export function PageWrapper(props: {
  title: string;
  height: "auto" | "full";
  loading: boolean;
  children: React.ReactNode;
}) {
  function getSubpageHeight() {
    return props.height === "auto" ? { height: "auto" } : { height: "100%" };
  }

  return (
    <div className={s.subpageWrapper}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p className={s.pageTitle}>{props.title}</p>
        <ProfileHeader />
      </div>
      <div className={s.subpage} style={getSubpageHeight()}>
        {props.loading ? <LoadingSpinner fullHeight={false} /> : props.children}
      </div>
    </div>
  );
}
