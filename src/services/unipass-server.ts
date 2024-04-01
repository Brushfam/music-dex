"use server";
import { Contract, providers, utils, Wallet } from "ethers";
import {baseContractAbi, baseContractAddress, erc20Abi, songContractAbi} from "@/data/contractsData";

const infuraKey =
  process.env.NEXT_PUBLIC_TEST_INFURA_KEY ?? process.env.INFURA_KEY;

const polygonProvider = new providers.JsonRpcProvider({
  url: "https://polygon-mainnet.infura.io/v3/" + infuraKey,
  skipFetchSetup: true,
});

export async function getBaseSigner() {
  "use server";
  const basePrivateKey =
    process.env.NEXT_PUBLIC_TEST_KEY ?? process.env.BASE_KEY;
  if (!basePrivateKey) {
    throw new Error("Base key is empty");
  }

  const baseAccount = utils.HDNode.fromMnemonic(basePrivateKey).derivePath(
    `m/44'/60'/0'/0/${3}`,
  );
  return new Wallet(baseAccount, polygonProvider);
}

export async function getProviderGasPrice() {
  "use server";
  const feeData = await polygonProvider.getFeeData();
  return feeData.gasPrice;
}

// AGREEMENT
export async function signAgreement(user: string) {
  const baseSigner = await getBaseSigner();
  const baseToken = new Contract(
      baseContractAddress,
      baseContractAbi,
      baseSigner,
  );
  const gasPrice = await getProviderGasPrice();
  let populatedTransaction = await baseToken.populateTransaction.signAgreement(
      user,
      {
        gasPrice: gasPrice,
      },
  );
  const signer = await getBaseSigner();
  let res = await signer.sendTransaction(populatedTransaction);
  console.log(res);
}

export async function hasAgreement(user: string) {
  const baseSigner = await getBaseSigner();
  const baseToken = new Contract(
      baseContractAddress,
      baseContractAbi,
      baseSigner,
  );
  return await baseToken.hasAgreement(user);
}

// SONG PAGE
export async function getFreeTokenBalance(tokenAddress: string) {
  const baseSigner = await getBaseSigner();
  const songToken = new Contract(tokenAddress, songContractAbi, baseSigner);
  let signTx = await songToken.getFreeTokenBalance();
  return signTx.toNumber();
}

export async function hasEnoughBalance(user: string, amountToPay: string) {
  const baseSigner = await getBaseSigner();
  const usdtAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
  const usdtDecimals = 1_000_000;
  const toPay = parseFloat(amountToPay) * usdtDecimals;

  const usdt = new Contract(usdtAddress, erc20Abi, baseSigner)
  let balance = await usdt.balanceOf(user)
  let fee = 1_00_000 // approximate max fee
  return balance.toNumber() > (toPay + fee)
}

// USER MENU
export async function getUserTokensData(address: string, tokenAddress: string) {
  const baseSigner = await getBaseSigner();
  const songToken = new Contract(tokenAddress, songContractAbi, baseSigner);
  return await songToken.getUserTokensData(address);
}

export async function getUsersData(
    userAddress: string,
    addressesArray: string[],
) {
  type userTokensData = { amount: number; earning: number };
  let promisesArray: userTokensData[] = [];

  for (let i = 0; i < addressesArray.length; i += 1) {
    let data = await getUserTokensData(userAddress, addressesArray[i]);
    promisesArray.push({
      amount: data[0].toNumber(),
      earning: data[1].toNumber(),
    });
  }

  return JSON.stringify(promisesArray);
}

export async function addTokenholderBalance(
    user: string,
    amount: number,
    contractAddress: string,
) {
  const baseSigner = await getBaseSigner();
  const songToken = new Contract(contractAddress, songContractAbi, baseSigner);
  const gasPrice = await getProviderGasPrice();
  let populatedTransaction =
      await songToken.populateTransaction.addTokenholderBalance(user, amount, {
        gasPrice: gasPrice,
      });

  const signer = await getBaseSigner();
  let tx = await signer.sendTransaction(populatedTransaction);
  let res = await tx.wait();
  console.log(res);
}

// ADMIN MENU
export async function updateIncome(contractAddress: string, income: number) {
  const baseSigner = await getBaseSigner();
  const songToken = new Contract(contractAddress, songContractAbi, baseSigner);
  const gasPrice = await getProviderGasPrice();
  let populatedTransaction = await songToken.populateTransaction.updateIncome(
      income,
      {
        gasPrice: gasPrice,
      },
  );
  let tx = await baseSigner.sendTransaction(populatedTransaction);
  let res = await tx.wait();
  console.log(res);
}
