"use server";
import { providers } from "ethers";
import { verifyMessageSignature } from "@unipasswallet/popup-utils";

export async function unipassVerifySignature(
  message: string,
  sig: string,
  address: string,
) {
  "use server";
  try {
    const testProvider = new providers.JsonRpcProvider({
      skipFetchSetup: true,
      url: "https://rpc-mumbai.maticvigil.com/",
    });
    return await verifyMessageSignature(
      message,
      sig,
      address,
      false,
      testProvider,
    );
  } catch (err) {
    console.log("auth err", err);
    return false;
  }
}
