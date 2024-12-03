import s from "@/app/[locale]/(private)/profile/Profile.module.scss";
import { useState } from "react";
import { LoadingSpinner } from "../../_components/LoadingSpinner";
import { ProfileHeader } from "../../_components/ProfileHeader/ProfileHeader";
import { BalanceTable } from "./balance/BalanceTable";
import { HeaderButtons } from "./balance/HeaderButtons";
import Popups from "./balance/Popups";

export const Balance = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={s.subpageWrapper}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p className={s.pageTitle}>Balance</p>
        </div>
        <ProfileHeader />
      </div>
      {loading ? (
        <LoadingSpinner fullHeight={true} />
      ) : (
        <div className={s.contentWrapper}>
          <HeaderButtons />
          <BalanceTable />
          <Popups />
        </div>
      )}
    </div>
  );
};
