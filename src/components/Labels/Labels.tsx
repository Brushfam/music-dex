import s from "./Lables.module.scss";

function LabelBlock(props: { iconName: string; label: string }) {
  return (
    <div className={s.labelBlock}>
      <img src={"/icons/labels/" + props.iconName} alt={props.label} />
      <p>{props.label}</p>
    </div>
  );
}

export function Labels(props: { genre?: string; location?: string }) {
  return (
    <div className={s.labels}>
      {props.genre ? (
        <LabelBlock iconName={"genre.svg"} label={props.genre} />
      ) : null}
      {props.location ? (
        <LabelBlock iconName={"location.svg"} label={props.location} />
      ) : null}
    </div>
  );
}
