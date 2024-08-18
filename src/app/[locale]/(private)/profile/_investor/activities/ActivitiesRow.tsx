import Image from "next/image";
import s from "./Activities.module.scss";

export function ActivitiesRow(props: {
  lastDate: string;
  song: string;
  tokens: number | string;
  invested: number | string;
  status: string;
  songLink: string;
}) {
  function StatusBlock(props: { status: string }) {
    if (props.status === "WAITING") {
      return (
        <div className={s.waiting}>
          <p>Waiting</p>
        </div>
      );
    } else if (props.status === "COMPLETE") {
      return (
        <div className={s.complete}>
          <p>Completed</p>
        </div>
      );
    } else {
      return (
        <div className={s.declined}>
          <p>Declined</p>
        </div>
      );
    }
  }

  return (
    <div className={s.songRow}>
      <p className={s.songRow_date}>{props.lastDate}</p>
      <p className={s.songRow_song}>{props.song}</p>
      <p className={s.songRow_tokens}>{props.tokens}</p>
      <p className={s.songRow_invested}>${props.invested}</p>
      <StatusBlock status={props.status} />
      <a
        href={props.songLink}
        target={"_blank"}
        style={{ position: "absolute", right: 32 }}
      >
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
