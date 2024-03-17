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
      let testProvider = new providers.JsonRpcProvider({
          skipFetchSetup: true,
          url: "https://rpc-mumbai.maticvigil.com/"
      }
      );
    const ret = await verifyMessageSignature(
      message,
      sig,
      address,
      false,
      testProvider,
    );
    if (ret) {
      console.log("verify signature success");
    } else {
      console.error("verify signature failed");
    }
  } catch (err) {
    console.log("auth err", err);
  }
}
