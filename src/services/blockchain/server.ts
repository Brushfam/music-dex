"use server";

import { Account, Contract, RpcProvider } from "starknet";

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

// DAI contract
export async function hasEnoughBalance(user: string, amount: number) {
  const daiStarknetAddress =
    "0x05574eb6b8789a91466f902c380d978e472db68170ff82a5b650b95a58ddf4ad";
  const { abi: contractAbi } =
    await providerBlast.getClassAt(daiStarknetAddress);
  let ethContract = new Contract(
    contractAbi,
      daiStarknetAddress,
      providerBlast,
  );
  let balance = await ethContract.balance_of(user);
  let daiAmount = BigInt(amount * 1_000_000_000) * BigInt("1000000000")
  return balance > daiAmount;
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
    const myCall = baseContract.populate("sign_agreement", [user]);
    const writeRes = await baseContract.sign_agreement(myCall.calldata);
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

export async function strkIncreaseBalance(
  user: string,
  amount: number,
  songAddress: string,
) {
  const account = getAccountKey();
  const songContract = await getSongContract(songAddress);
  songContract.connect(account);
  const myCall = songContract.populate("increase_balance", [user, amount]);
  const writeRes = await songContract.add_tokenholder_balance(myCall.calldata);
  const res = await providerBlast.waitForTransaction(
    writeRes.transaction_hash,
  );
  console.log(res);
}

export async function strkBuy(
  amount: number,
  eth_to_pay: number,
  songAddress: string,
) {
  const account = getAccountKey();
  const songContract = await getSongContract(songAddress);
  songContract.connect(account);
  const myCall = songContract.populate("buy", [amount, eth_to_pay]);
  const writeRes = await songContract.add_tokenholder_balance(myCall.calldata);
  const res = await providerBlast.waitForTransaction(
    writeRes.transaction_hash,
  );
  console.log(res);
}

export async function strkUpdateIncome(amount: number, songAddress: string) {
  const account = getAccountKey();
  const songContract = await getSongContract(songAddress);
  songContract.connect(account);
  const myCall = songContract.populate("update_income", [amount]);
  const writeRes = await songContract.update_income(myCall.calldata);
  const res = await providerBlast.waitForTransaction(
    writeRes.transaction_hash,
  );
  console.log(res);
}

export async function strkClaim(user: string, songAddress: string) {
  const account = getAccountKey();
  const songContract = await getSongContract(songAddress);
  songContract.connect(account);
  const myCall = songContract.populate("claim", [user]);
  const writeRes = await songContract.claim(myCall.calldata);
  const res = await providerBlast.waitForTransaction(
    writeRes.transaction_hash,
  );
  console.log(res);
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

export async function strkGetTokenholdersNumber(songAddress: string) {
  const songContract = await getSongContract(songAddress);
  return await songContract.get_tokenholders_number();
}
