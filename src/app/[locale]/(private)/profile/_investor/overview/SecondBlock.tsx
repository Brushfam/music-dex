import { PaymentHistory } from "@/app/[locale]/(private)/profile/_investor/overview/PaymentHistory";
import { Statistics } from "@/app/[locale]/(private)/profile/_investor/overview/Statistics";
import { SuggestedSongs } from "@/app/[locale]/(private)/profile/_investor/overview/SuggestedSongs";
import s from "./Overview.module.scss";

export function SecondBlock() {
  return (
    <div className={s.secondOverviewRow}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
        }}
      >
        <Statistics />
        <PaymentHistory />
      </div>
      <SuggestedSongs />
    </div>
  );
}
