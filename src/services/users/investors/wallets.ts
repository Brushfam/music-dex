import { PublicKey } from "@solana/web3.js";
import axios from "axios";

export function ifUserHasWallets(jwt: string) {
  return axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/wallets/exist",
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}

export function getUserWallets(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/wallets", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function addUserWallet(
  jwt: string,
  address: string | PublicKey,
  name: string
) {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/wallets",
    {
      address: address,
      name: name,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}

export function updatePrimaryWallet(jwt: string, primaryAddress: string) {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/wallets/primary",
    {
      primaryAddress: primaryAddress,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}

export function deleteWallet(
  jwt: string,
  data: { address: string; name: string }
) {
  return axios.delete(process.env.NEXT_PUBLIC_SERVER_URL + "/users/wallets", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
    data,
  });
}

export function createInternalWallet(jwt: string) {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/wallets/internal",
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}

type sendTransactionProps = {
  method: "wallet" | "whitepay";
  amount: number;
  currency: string;
  txHash?: string;
  fromAddress?: string;
};

export function transactionSend(jwt: string, info: sendTransactionProps) {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/replenishments",
    info,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}

type withdrwFetchProps = {
  amount: string;
  currency: string;
  address?: string;
};

export function withdrwFetch(jwt: string, info: withdrwFetchProps) {
  return axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + "/users/withdrawals",
    info,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer: " + jwt,
      },
    }
  );
}
