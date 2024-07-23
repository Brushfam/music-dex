import * as React from "react";

export function FancyboxElement(props: { event: string; n: number }) {
  return (
    <a
      data-fancybox="gallery"
      href={"/gallery/" + props.event + "/img" + props.n + ".jpg"}
    >
      <img
        alt={"image" + props.n}
        src={"/gallery/" + props.event + "/thumbnails/tmb" + props.n + ".jpeg"}
      />
    </a>
  );
}
