import s from "./Lables.module.scss";
import Image from "next/image";

function LabelBlock(props: { iconName: string; label: string }) {
  return (
    <div className={s.labelBlock}>
      <img src={"/icons/labels/" + props.iconName} alt={props.label} />
      <p>{props.label}</p>
    </div>
  );
}

export function Labels(props: {
  author?: string;
  genre?: string;
  location?: string;
}) {
  return (
    <div className={s.labels}>
      {props.author ? (
        <LabelBlock iconName={"author.svg"} label={props.author} />
      ) : (
        <></>
      )}
      <div className={s.twoLabels}>
        {props.genre ? (
            <LabelBlock iconName={"genre.svg"} label={props.genre} />
        ) : (
            <></>
        )}
        {props.location ? (
            <LabelBlock iconName={"location.svg"} label={props.location} />
        ) : (
            <></>
        )}
      </div>
    </div>
  );
}
