import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

export function ProjectedEarnings() {
  const t = useTranslations("ProfileInvestor.Overview");

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 6 }}>
      <Image
        src={"/profile/overview/projected-earnings.svg"}
        alt={"earnings"}
        width={17}
        height={20}
      />
      <p style={{ color: "rgb(246, 96, 31)", fontSize: 16, fontWeight: 600 }}>
        {t("projected_earnings")}
      </p>
    </div>
  );
}
