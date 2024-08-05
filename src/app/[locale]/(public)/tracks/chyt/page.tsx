import {
  chytEN,
  chytUK,
  trackAddresses,
} from "@/data/tracksData";
import { PageTemplate } from "@/app/[locale]/(public)/tracks/_components/PageTemplate/PageTemplate";
import { streamingServices } from "@/types/types";

export default function ChytTrack() {
  const services: streamingServices = {
    youtube: "https://www.youtube.com/watch?v=j6SHQRh7yWo",
    youtubeMusic: "https://www.youtube.com/watch?v=j6SHQRh7yWo",
    apple: "https://www.youtube.com/watch?v=j6SHQRh7yWo",
    spotify: "https://www.youtube.com/watch?v=j6SHQRh7yWo",
  };

  return (
    <PageTemplate
      artist={"David Maskisa"}
      songName={"Чуть"}
      tokenAddress={trackAddresses.chyt}
      pathToCover={"/albums/chyt.jpg"}
      youtubeId={"j6SHQRh7yWo"}
      services={services}
      songId={3}
      trackDataEN={chytEN}
      trackDataUK={chytUK}
      coverTop={true}
    ></PageTemplate>
  );
}
