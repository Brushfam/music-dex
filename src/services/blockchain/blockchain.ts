"use server";

import {Account, Contract, RpcProvider} from "starknet";

// setup
const providerBlast = new RpcProvider({
  nodeUrl: "https://starknet-mainnet.public.blastapi.io/rpc/v0_7",
});
const starknetKey =
  process.env.NEXT_PUBLIC_TEST_STARKNET_KEY ?? process.env.STARKNET_KEY;
const accountAddress =
  "0x02589682c89a2b01b171f61bd0e6b8c946fbd283ab4e66f220780283fd74b3ef";

// contracts addresses
const baseContractAddress =
  "0x00d174adbcfce7d65d9682bfd37633936eb38abc1867f72ba60d1eb1727a9747";

function getAccountKey() {
  if (!starknetKey) {
    throw Error("Server error: empty Starknet account key.");
  }
  return new Account(providerBlast, accountAddress, starknetKey, "1");
}

// USDT contract
export async function hasEnoughBalance(user: string, amount: number) {
  const usdtStarknetAddress =
    "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8";
  const { abi: contractAbi } =
    await providerBlast.getClassAt(usdtStarknetAddress);
  let usdtContract = new Contract(
    contractAbi,
      usdtStarknetAddress,
      providerBlast,
  );
  let balance = await usdtContract.balance_of(user);
  let usdtAmount = BigInt(amount * 1_000_000)
  return balance > usdtAmount;
}

// BaseContract
export async function strkHasAgreement(user: string) {
  try {
    const { abi: testAbi } =
      await providerBlast.getClassAt(baseContractAddress);
    const baseContract = new Contract(
      testAbi,
      baseContractAddress,
        providerBlast,
    );
    const agreement = await baseContract.has_agreement(user);
    return agreement.toString();
  } catch (e) {
    console.log(e);
  }
}

export async function strkSignAgreement(user: string) {
  const account = getAccountKey();
  try {
    const { abi: testAbi } =
      await providerBlast.getClassAt(baseContractAddress);
    const baseContract = new Contract(
      testAbi,
      baseContractAddress,
        providerBlast,
    );
    baseContract.connect(account);

    const { suggestedMaxFee: estimatedFee1 } = await account.estimateInvokeFee({
      contractAddress: baseContractAddress,
      entrypoint: 'sign_agreement',
      calldata: [user],
    });

    const myCall = baseContract.populate("sign_agreement", [user]);
    const fee = (estimatedFee1 * BigInt(12)) / BigInt(10)
    const writeRes = await baseContract.sign_agreement(myCall.calldata, { maxFee: fee  });
    const res = await providerBlast.waitForTransaction(
      writeRes.transaction_hash,
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

// SongContract
async function getSongContract(address: string) {
  const { abi: contractAbi } = await providerBlast.getClassAt(address);
  return new Contract(contractAbi, address, providerBlast);
}

export async function strkGetUserData(user: string, songAddress: string) {
  try {
    const songContract = await getSongContract(songAddress);
    return await songContract.get_user_tokens_data(user);
  } catch (e) {
    console.log(e);
  }
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
