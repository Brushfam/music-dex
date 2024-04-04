"use server";
import {BigNumber, Contract, providers, utils, Wallet} from "ethers";
import {baseContractAbi, baseContractAddress, usdtAbi, songContractAbi} from "@/data/contractsData";

const rpcKey = process.env.PRIVATE_RPC;

const polygonProvider = new providers.JsonRpcProvider({
  url: rpcKey ? rpcKey : "https://polygon-rpc.com/",
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

export async function getProviderGasPriceClient() {
  "use server";
  const feeData = await polygonProvider.getFeeData();
  return JSON.stringify(feeData.gasPrice);
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

export async function hasEnoughUSDT(user: string, amountToPay: string, unipassWithoutMatic: boolean) {
  const baseSigner = await getBaseSigner();
  const usdtAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
  const usdtDecimals = 1_000_000;
  const toPay = parseFloat(amountToPay) * usdtDecimals;

  const usdt = new Contract(usdtAddress, usdtAbi, baseSigner)
  const balance = await usdt.balanceOf(user)
  const fee = unipassWithoutMatic ? 1_00_000 : 0 // approximate max usdt fee

  return balance.toNumber() >= (toPay + fee)
}

export async function hasEnoughMATIC(user: string) {
  const polygonFee = BigNumber.from("10000000000000000")  // 10e16
  const balance = await polygonProvider.getBalance(user)
  return balance.gte(polygonFee)
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

  let populatedTransaction =
      await songToken.populateTransaction.addTokenholderBalance(user, amount, {
        maxPriorityFeePerGas: "60160000000",
        maxFeePerGas: "601600000000"
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
