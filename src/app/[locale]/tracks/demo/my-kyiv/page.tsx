import {myKyivData, tokensAddresses} from "@/data/tracksData";
import {PageTemplate} from "@/app/[locale]/tracks/_components/PageTemplate/PageTemplate";

export default function MyKyiv() {
  return (
      <PageTemplate artist={"Tony Tonite"} songName={"Києве мій"} tokenAddress={tokensAddresses.myKyiv} trackData={myKyivData}>

      </PageTemplate>
  );
}
