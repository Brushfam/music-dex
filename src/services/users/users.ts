import { InvestorInfo } from "@/types/types";
import axios from "axios";

export function getUserRole(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/role", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function getUserLoginInfo(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/login-info", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function setFirstLogin(jwt: string) {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/login-info",
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}

export function addNewUser(jwt: string, email: string, role: string) {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users",
    {
      email: email,
      role: role,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}

export function getUserOverview(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/overview", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function getUserSongs(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/songs", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function getUserInfo(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/info", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function updateUserInfo(jwt: string, info: InvestorInfo) {
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
