import {AccountInterface, cairo, CallData, RpcProvider} from "starknet";

const providerBlast = new RpcProvider({
  nodeUrl: "https://starknet-mainnet.public.blastapi.io/rpc/v0_7",
});

const buyerAddress = "0x0459efcbcbbf116e5cebd35a99843a377789f5d2069155b03f486fa61232afb0"

export async function buyTokensStarknet(
  account:  AccountInterface,
  songAddress: string,
  tokensToPay: number,
  tokensToBuy: number,
) {
  const usdtAddress =
    "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8";
  const usdtDecimals = 1_000_000
  const toPay = usdtDecimals * tokensToPay
  const songDecimals = 10
  const toBuy = songDecimals * tokensToBuy

  const multiCall = await account.execute([
    {
      contractAddress: usdtAddress,
      entrypoint: "approve",
      calldata: CallData.compile({
        spender: buyerAddress,
        amount: cairo.uint256(toPay.toString()),
      }),
    },
    {
      contractAddress: buyerAddress,
      entrypoint: "buy",
      calldata: CallData.compile({
        amount: cairo.uint256(toBuy),
        song: songAddress,
      }),
    },
  ]);
  await providerBlast.waitForTransaction(multiCall.transaction_hash);
}
