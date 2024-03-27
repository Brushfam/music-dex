"use client";
import YouTube from "react-youtube";

export function YoutubeVideo(props: { id: string }) {
  const opts = {
    height: "288",
    width: "100%",
    playerVars: {},
  };

  return <YouTube videoId={props.id} opts={opts} />;
}
