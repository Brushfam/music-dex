import { dealerEN, dealerUK } from "@/data/tracksData";
import { PageTemplate } from "@/app/[locale]/tracks/_components/PageTemplate/PageTemplate";
import { dealerAddress } from "@/data/contractsData";

export default function DealerTrack() {
  const tokenAddress = '0x037ddcc10a36d6a0016b1f129386da1d1b7241bff3550ad74b446199111c3898'
  return (
    <PageTemplate
      artist={"Tony Tonite"}
      songName={"Дилер"}
      tokenAddress={tokenAddress}
      trackDataEN={dealerEN}
      trackDataUK={dealerUK}
    ></PageTemplate>
  );
}
