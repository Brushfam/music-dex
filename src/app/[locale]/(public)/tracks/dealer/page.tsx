import { dealerEN, dealerUK, trackAddresses } from "@/data/tracksData";
import { PageTemplate } from "@/app/[locale]/(public)/tracks/_components/PageTemplate/PageTemplate";

export default function DealerTrack() {
  return (
    <PageTemplate
      artist={"Tony Tonite"}
      songName={"Дилер"}
      tokenAddress={trackAddresses.dealer}
      trackDataEN={dealerEN}
      trackDataUK={dealerUK}
    ></PageTemplate>
  );
}
