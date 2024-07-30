import s from "./Gallery.module.scss";

export function EventBlock(props: {
  title: string;
  date: string;
  folder: string;
}) {
  return (
    <div className={s.eventBlock}>
      <div className={s.eventBlock_illustration}>
        <img
          src={"/gallery/" + props.folder + "/logo.svg"}
          alt={"illustration"}
        />
      </div>
      <div className={s.eventBlock_description}>
        <p className={s.eventBlock_date}>{props.date}</p>
        <p className={s.eventBlock_title}>{props.title}</p>
      </div>
    </div>
  );
}
