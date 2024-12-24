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

export function getUserTotalEarnings(jwt: string) {
  return axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/royalties/earned",
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}

export function getUserRoyaltiesStatistics(jwt: string) {
  return axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/royalties/statistics",
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}

export function getUserRoyalties(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/royalties", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function getReplenishments(jwt: string) {
  return axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/replenishments",
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}

export function getWithdrawals(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/withdrawals", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function getInvoices(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/invoice", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function fetchInvoice(
  jwt: string,
  body: { song_id: number; amount: number; currency: string }
) {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/invoice",
    body,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}

export function getBalances(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/balances", {
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
