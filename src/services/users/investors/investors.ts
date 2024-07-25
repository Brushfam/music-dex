import axios from "axios";
import { InvestorInfo } from "@/types/types";

export function createInvoice(jwt: string, token_amount: number) {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/invoice",
    { song_id: 1, token_amount: token_amount },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    },
  );
}

export function getInvestorInfo(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/info", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function updateInvestorInfo(jwt: string, info: InvestorInfo) {
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

export function getUserSongs(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/songs", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function getUserActivities(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/activities", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function getNFTs(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/nfts", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}
