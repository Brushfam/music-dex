import { PaymentHistory } from "@/app/[locale]/(private)/profile/_investor/overview/PaymentHistory";
import { Statistics } from "@/app/[locale]/(private)/profile/_investor/overview/Statistics";
import { SuggestedSongs } from "@/app/[locale]/(private)/profile/_investor/overview/SuggestedSongs";
import { ISongData } from "@/types/types";
import { ListOfSongs } from "./ListOfSongs";
import s from "./Overview.module.scss";

interface SecondBlockProps {
  songs: ISongData[];
}

export function SecondBlock({ songs }: SecondBlockProps) {
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
        <ListOfSongs songs={songs} />
        <SuggestedSongs songs={songs} />
      </div>
    </div>
  );
}
