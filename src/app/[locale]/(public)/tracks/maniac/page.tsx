import { maniacEN, maniacUK, trackAddresses } from "@/data/tracksData";
import { PageTemplate } from "@/app/[locale]/(public)/tracks/_components/PageTemplate/PageTemplate";
import { streamingServices } from "@/types/types";

export default function ManiacTrack() {
  const services: streamingServices = {
    apple:
      "https://music.apple.com/us/album/%D0%BC%D0%B0%D0%BD%D1%96%D1%8F%D0%BA-single/1753021546",
    spotify:
      "https://open.spotify.com/track/2V5oVvgWRvZPd53EHItitF?si=6173d9681f9a4d34",
    youtube: "https://www.youtube.com/watch?v=Ply0cjDXRDs",
    youtubeMusic:
      "https://music.youtube.com/watch?v=Ply0cjDXRDs&si=he9bnYIMvyhdMW10",
  };

  return (
    <PageTemplate
      artist={"FREAKY SIREN"}
      songName={"МАНІЯК"}
      tokenAddress={trackAddresses.dealer}
      pathToCover={"/albums/maniac.jpg"}
      youtubeId={"Ply0cjDXRDs"}
      services={services}
      songId={2}
      trackDataEN={maniacEN}
      trackDataUK={maniacUK}
    ></PageTemplate>
  );
}
