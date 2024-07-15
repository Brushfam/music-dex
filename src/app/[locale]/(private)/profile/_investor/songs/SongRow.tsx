import s from "./Songs.module.scss";
import Image from "next/image";

export function SongRow(props: {
  lastDate: string;
  song: string;
  tokens: number;
  invested: number;
  songLink: string;
}) {
  return (
    <div className={s.songRow}>
      <p className={s.songRow_date}>{props.lastDate}</p>
      <p className={s.songRow_song}>{props.song}</p>
      <p className={s.songRow_tokens}>{props.tokens}</p>
      <p className={s.songRow_invested}>${props.invested}</p>
      <a href={props.songLink} style={{ position: "absolute", right: 32 }}>
        <Image
          src={"/profile/icons/link-to-song.svg"}
          alt={"arrow"}
          width={10}
          height={10}
        />
      </a>
    </div>
  );
}
