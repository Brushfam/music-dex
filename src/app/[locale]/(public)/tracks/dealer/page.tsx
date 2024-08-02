import { dealerEN, dealerUK, trackAddresses } from "@/data/tracksData";
import { PageTemplate } from "@/app/[locale]/(public)/tracks/_components/PageTemplate/PageTemplate";
import { streamingServices } from "@/types/types";

export default function DealerTrack() {
  const services: streamingServices = {
    youtube: "https://youtu.be/Jb5qdg30jSU?si=S3Zrl15hXdy97_CP",
    youtubeMusic:
      "https://music.youtube.com/playlist?list=OLAK5uy_kk-5lk0jb0o0TAqFgYzDwM2I7JvGuyhlo&si=POEggXulYwj-Hj9J",
    apple:
      "https://music.apple.com/us/album/%D0%B4%D0%B8%D0%BB%D0%B5%D1%80-single/1735502812",
    spotify:
      "https://open.spotify.com/album/5zerH7hovdbLXVOn57gs8c?si=jsuowanBTk2wZMlsdBMD5Q",
  };

  return (
    <PageTemplate
      artist={"Tony Tonite"}
      songName={"Дилер"}
      tokenAddress={trackAddresses.dealer}
      pathToCover={"/albums/dealer.jpg"}
      youtubeId={"Jb5qdg30jSU"}
      services={services}
      songId={1}
      trackDataEN={dealerEN}
      trackDataUK={dealerUK}
    ></PageTemplate>
  );
}
