import axios from "axios";

export function getSongAvailableTokens(songId: number) {
  return axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + "/songs/available-amount",
    {
      params: {
        songId,
      },
    }
  );
}

export function getSongStreams(songId: number, songPlatform: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/songs/listening", {
    params: {
      songId,
      songPlatform,
    },
  });
}
