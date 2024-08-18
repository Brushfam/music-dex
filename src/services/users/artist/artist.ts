import { ArtistInfo } from "@/types/types";
import axios from "axios";

export function updateArtistInfo(jwt: string, info: ArtistInfo) {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/info",
    { details: info },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}
