import { PaymentHistory } from "@/app/[locale]/(private)/profile/_investor/overview/PaymentHistory";
import { Statistics } from "@/app/[locale]/(private)/profile/_investor/overview/Statistics";
import { SuggestedSongs } from "@/app/[locale]/(private)/profile/_investor/overview/SuggestedSongs";
import { ListOfSongs } from "./ListOfSongs";
import s from "./Overview.module.scss";

interface SongsData {
  date: string;
  name: string;
  tokens: number;
  invested: number;
  slug: string;
}

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <ListOfSongs />
        <SuggestedSongs />
      </div>
    </div>
  );
}
