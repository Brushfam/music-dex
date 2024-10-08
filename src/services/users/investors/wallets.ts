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

export function addUserWallet(jwt: string, address: string, name: string) {
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
