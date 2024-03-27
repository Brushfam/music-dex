import { dealerEN, dealerUK } from "@/data/tracksData";
import { PageTemplate } from "@/app/[locale]/tracks/_components/PageTemplate/PageTemplate";
import { dealerAddress } from "@/data/contractsData";

export default function DealerTrack() {
  return (
    <PageTemplate
      artist={"Tony Tonite"}
      songName={"Дилер"}
      tokenAddress={dealerAddress}
      trackDataEN={dealerEN}
      trackDataUK={dealerUK}
    ></PageTemplate>
  );
}
