import axios from "axios";

export function getSongsStreams(
  songId: number,
  songPlatform: string,
) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/songs/listening", {
    params: {
      songId,
      songPlatform,
    },
  });
}
