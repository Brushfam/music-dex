import s from "./TrackCard.module.scss";

function TrackCardComponent(props: {
  image: string;
  title: string;
  author: string;
}) {
  return (
    <div className={s.trackCardWrapper}>
      <div className={s.trackCard}>
        <img src={props.image} alt={props.title} />
        <p className={s.title}>{props.title}</p>
        <p className={s.author}>{props.author}</p>
      </div>
    </div>
  );
}

export function TrackCard1() {
  return (
    <TrackCardComponent
      image={"/albums/album1.png"}
      title={"Києве мій"}
      author={"Tony Tonite"}
    />
  );
}

export function TrackCard2() {
  return (
    <TrackCardComponent
      image={"/albums/album2.png"}
      title={"og 044"}
      author={"Tony Tonite"}
    />
  );
}

export function TrackCard3() {
  return (
    <TrackCardComponent
      image={"/albums/album3.png"}
      title={"Позивний ТТ"}
      author={"Tony Tonite"}
    />
  );
}

export function TrackCard4() {
  return (
    <TrackCardComponent
      image={"/albums/album4.png"}
      title={"Українське сонце"}
      author={"Tony Tonite feat. Yarmak"}
    />
  );
}
