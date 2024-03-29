import s from "./TrackCard.module.scss";

function TrackCardComponent(props: { image: string; title: string }) {
  return (
    <div className={s.trackCardWrapper}>
      <div className={s.trackCard}>
        <img src={props.image} alt={props.title} style={{ borderRadius: 4 }} />
        <p className={s.title}>{props.title}</p>
      </div>
    </div>
  );
}

export function TrackCard1() {
  return (
    <TrackCardComponent
      image={"/albums/homepage1.jpg"}
      title={"Coming soon!"}
    />
  );
}

export function TrackCard2() {
  return (
    <TrackCardComponent
      image={"/albums/homepage2.jpg"}
      title={"Coming soon!"}
    />
  );
}

export function TrackCard3() {
  return (
    <TrackCardComponent
      image={"/albums/homepage3.jpg"}
      title={"Coming soon!"}
    />
  );
}

export function TrackCard4() {
  return <TrackCardComponent image={"/albums/dealer.jpg"} title={"Dealer"} />;
}
