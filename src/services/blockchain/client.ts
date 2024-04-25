import {AccountInterface, cairo, CallData, RpcProvider} from "starknet";

const providerBlast = new RpcProvider({
  nodeUrl: "https://starknet-mainnet.public.blastapi.io/rpc/v0_7",
});

const buyerAddress = "0x0371f9fc1df80e68f910866482b7af5ae85216247012fe005e58bad899a25c74"
const ownerAddress = "0x02589682c89a2b01b171f61bd0e6b8c946fbd283ab4e66f220780283fd74b3ef"

export async function buyTokensStarknet(
  account:  AccountInterface,
  songAddress: string,
  tokensToPay: number,
  tokensToBuy: number,
) {
  const daiAddress =
    "0x05574eb6b8789a91466f902c380d978e472db68170ff82a5b650b95a58ddf4ad";
  const daiDecimals = 1_000_000_000_000_000_000
  const toPay = daiDecimals * tokensToPay
  const multiCall = await account.execute([
    {
      contractAddress: daiAddress,
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
        amount: cairo.uint256(Math.round(tokensToBuy)),
        song: songAddress,
      }),
    },
  ]);
  await providerBlast.waitForTransaction(multiCall.transaction_hash);
}
