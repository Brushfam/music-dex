import { myKyivDataEN, myKyivDataUK } from "@/data/tracksData";
import { PageTemplate } from "@/app/[locale]/tracks/_components/PageTemplate/PageTemplate";
import {myKyivAddress} from "@/data/contractsData";

export default function MyKyiv() {
  return (
    <PageTemplate
      artist={"Tony Tonite"}
      songName={"Києве мій"}
      tokenAddress={myKyivAddress}
      trackDataEN={myKyivDataEN}
      trackDataUK={myKyivDataUK}
    ></PageTemplate>
  );
}
