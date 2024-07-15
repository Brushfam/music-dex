import axios from "axios";
import { ArtistInfo } from "@/types/types";

export function getArtistInfo(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/info", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function updateArtistInfo(jwt: string, info: ArtistInfo) {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/info",
    { details: info },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    },
  );
}
