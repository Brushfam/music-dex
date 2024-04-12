"use server";

import { Account, Contract, RpcProvider } from "starknet";

// setup
const providerBlastTestnet = new RpcProvider({
  nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
});
const starknetKey =
  process.env.NEXT_PUBLIC_TEST_STARKNET_KEY ?? process.env.STARKNET_KEY;
const accountAddress =
  "0x02589682c89a2b01b171f61bd0e6b8c946fbd283ab4e66f220780283fd74b3ef";
const privateKey = starknetKey ?? ""; // tmp
const account = new Account(providerBlastTestnet, accountAddress, privateKey);

// contracts addresses
const baseContractAddress =
  "0x06494d9e614ad136ce0862b2ade7ad2d3471fcbd490a293b1dad4db146a0ff27";
const songContractAddress =
  "0x037ddcc10a36d6a0016b1f129386da1d1b7241bff3550ad74b446199111c3898";

// BaseContract
export async function starknetHasAgreement(user) {
  try {
    const { abi: testAbi } =
      await providerBlastTestnet.getClassAt(baseContractAddress);
    const baseContract = new Contract(
      testAbi,
      baseContractAddress,
      providerBlastTestnet,
    );
    const agreement = await baseContract.has_agreement(user);
    return agreement.toString();
  } catch (e) {
    console.log(e);
  }
}

export async function starknetSignAgreement(user) {
  try {
    const { abi: testAbi } =
      await providerBlastTestnet.getClassAt(baseContractAddress);
    const baseContract = new Contract(
      testAbi,
      baseContractAddress,
      providerBlastTestnet,
    );
    baseContract.connect(account);
    const myCall = baseContract.populate("sign_agreement", [user]);
    const writeRes = await baseContract.sign_agreement(myCall.calldata);
    const res = await providerBlastTestnet.waitForTransaction(
      writeRes.transaction_hash,
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

// SongContract
export async function starknetAddTokenholderBalance(user, amount) {
  const { abi: contractAbi } =
    await providerBlastTestnet.getClassAt(songContractAddress);
  const songContract = new Contract(
    contractAbi,
    songContractAddress,
    providerBlastTestnet,
  );
  songContract.connect(account);
  const myCall = songContract.populate("add_tokenholder_balance", [
    user,
    amount,
  ]);
  const writeRes = await songContract.add_tokenholder_balance(myCall.calldata);
  const res = await providerBlastTestnet.waitForTransaction(
    writeRes.transaction_hash,
  );
  console.log(res);
  const readRes = await songContract.balance_of(user);
  console.log(readRes);
}

export async function starknetUpdateIncome(user, amount) {
  const { abi: contractAbi } =
    await providerBlastTestnet.getClassAt(songContractAddress);
  const songContract = new Contract(
    contractAbi,
    songContractAddress,
    providerBlastTestnet,
  );
  songContract.connect(account);
  const myCall = songContract.populate("update_income", [user, amount]);
  const writeRes = await songContract.update_income(myCall.calldata);
  const res = await providerBlastTestnet.waitForTransaction(
    writeRes.transaction_hash,
  );
  console.log(res);
}

export async function starknetGetUserData(user) {
  try {
    const { abi: contractAbi } =
      await providerBlastTestnet.getClassAt(songContractAddress);
    const songContract = new Contract(
      contractAbi,
      songContractAddress,
      providerBlastTestnet,
    );
    return await songContract.get_user_tokens_data(user);
  } catch (e) {
    console.log(e);
  }
}

export async function starknetGetFreeBalance() {
  try {
    const { abi: contractAbi } =
      await providerBlastTestnet.getClassAt(songContractAddress);
    const songContract = new Contract(
      contractAbi,
      songContractAddress,
      providerBlastTestnet,
    );
    const res = await songContract.get_free_token_balance();
    return res;
  } catch (e) {
    console.log(e);
    return 0;
  }
}
