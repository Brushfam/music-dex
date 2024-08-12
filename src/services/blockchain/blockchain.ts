"use server";

import {Contract, RpcProvider} from "starknet";

// setup
const providerBlast = new RpcProvider({
  nodeUrl: "https://starknet-mainnet.public.blastapi.io/rpc/v0_7",
});

// SongContract
async function getSongContract(address: string) {
  const { abi: contractAbi } = await providerBlast.getClassAt(address);
  return new Contract(contractAbi, address, providerBlast);
}

export async function strkGetFreeBalance(songAddress: string) {
  try {
    const songContract = await getSongContract(songAddress);
    return await songContract.get_free_token_balance();
  } catch (e) {
    console.log(e);
    return 0;
  }
}
