import {og044Data, tokensAddresses} from "@/data/tracksData";
import {PageTemplate} from "@/app/[locale]/tracks/_components/PageTemplate/PageTemplate";

export default function Og044() {
  return (
      <PageTemplate artist={"Tony Tonite"} songName={"OG 044"} tokenAddress={tokensAddresses.og044} trackData={og044Data}>

      </PageTemplate>
  );
}
