import { dodomyEN, dodomyUK, trackAddresses } from "@/data/tracksData";
import { PageTemplate } from "@/app/[locale]/(public)/tracks/_components/PageTemplate/PageTemplate";

export default function DodomyTrack() {
  return (
    <PageTemplate
      artist={"Kalush"}
      songName={"Додому"}
      tokenAddress={trackAddresses.dodomy}
      trackDataEN={dodomyEN}
      trackDataUK={dodomyUK}
    ></PageTemplate>
  );
}
