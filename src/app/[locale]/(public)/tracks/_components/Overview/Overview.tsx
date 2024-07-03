import s from "./Overview.module.scss";
import YouTube from "react-youtube";
import Image from "next/image";
import Link from "next/link";

export function Overview(props: { videoId: string }) {
  const opts = {
    height: "320",
    width: "100%",
    playerVars: {},
  };

  return (
    <div className={s.overview}>
      <div className={s.videoWrapper}>
        <YouTube videoId={props.videoId} opts={opts} />
      </div>
      <div className={s.secondBlockWrapper}>
        <div className={s.detailsBlock}>
          <div className={s.details}>
            <p>Price per token</p>
            <p>$2.2</p>
          </div>
          <div className={s.details}>
            <p>Total purchased tokens</p>
            <p>6</p>
          </div>
          <div className={s.details}>
            <p>Tokens remaining</p>
            <p>9,994</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={s.listenOn}>
            <Image
              src={"/tracks/youtube.png"}
              alt={"youtube"}
              width={203}
              height={81}
            />
            <Image
              src={"/tracks/apple.png"}
              alt={"apple"}
              width={203}
              height={81}
            />
          </div>
          <div className={s.listenOn}>
            <Image
              src={"/tracks/youtube-music.png"}
              alt={"youtube-music"}
              width={203}
              height={81}
            />
            <Image
              src={"/tracks/spotify.png"}
              alt={"spotify"}
              width={203}
              height={81}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
