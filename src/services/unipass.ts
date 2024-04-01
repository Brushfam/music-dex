import { UniPassPopupSDK } from "@unipasswallet/popup-sdk";
import { UniPassTheme, UPEvent, UPEventType } from "@unipasswallet/popup-types";
import { Contract, providers, utils } from "ethers";
import {
  addTokenholderBalance,
  getFreeTokenBalance,
  getProviderGasPriceClient,
  updateIncome,
} from "@/services/unipass-server";
import { erc20Abi } from "@/data/contractsData";
import { ExternalProvider } from "@ethersproject/providers";

// constants
const unipassWallet = new UniPassPopupSDK({
  env: "prod",
  chainType: "polygon",
  storageType: "localStorage",
  appSettings: {
    theme: UniPassTheme.DARK,
    appName: "MusicDex",
    appIcon: "",
  },
});

const treasury = "0xcCe3842E8ea4aa62A3b9073BD7C22BfA25210eAd";
const usdt = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
const usdtDecimals = 1_000_000;

// helper functions
const checkTxStatus = async (txHash: string) => {
  let tryTimes = 0;
  while (tryTimes++ < 3) {
    const receipt = await unipassWallet
      .getProvider()
      .getTransactionReceipt(txHash);
    if (receipt) return receipt.status;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return false;
};

// LOGIN
export async function unipassLogin() {
  try {
    const account = await unipassWallet.login({
      email: true,
      eventListener: (event: UPEvent) => {
        console.log("event", event);
        const { type, body } = event;
        if (type === UPEventType.REGISTER) {
          console.log("account", body);
        }
      },
      connectType: "both",
    });
    const { address } = account;
    console.log("account", address);
    return address;
  } catch (err) {
    console.log("connect err", err);
  }
}

export async function unipassLogout() {
  await unipassWallet.logout(false);
}

// SONG PAGE
export async function unipassBuyTokens(
  user: string,
  amountToPay: string,
  amountToBuy: number,
  contractAddress: string,
) {
  await checkFreeTokens(contractAddress, amountToBuy);
  const toPay = parseFloat(amountToPay) * usdtDecimals;
  const data = new utils.Interface([
    "function transfer(address _to, uint256 _value)",
  ]).encodeFunctionData("transfer", [treasury, toPay]);
  const tx = {
    from: user,
    to: usdt,
    value: "0x0",
    data: data,
  };

  let txHash = await unipassWallet.sendTransaction(tx);
  if (await checkTxStatus(txHash)) {
    console.log("send Token success", txHash);
    await addTokenholderBalance(user, amountToBuy, contractAddress);
  } else {
    console.error(`send Token failed, tx hash = ${txHash}`);
    throw Error("Sending token failed");
  }
}

export async function wcBuyTokens(
  user: string,
  amountToPay: string,
  amountToBuy: number,
  contractAddress: string,
  currentProvider: ExternalProvider | undefined,
) {
  if (!currentProvider) {
    throw Error("Provider not found.");
  }
  await checkFreeTokens(contractAddress, amountToBuy);

  const usdtAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
  const usdtDecimals = 1_000_000;
  const toPay = parseFloat(amountToPay) * usdtDecimals;

  const usdtProvider = new providers.Web3Provider(currentProvider);
  const usdt = new Contract(usdtAddress, erc20Abi, usdtProvider.getSigner());

  const gasPrice = await getProviderGasPriceClient();
  let populatedTransaction = await usdt.populateTransaction.transfer(
    treasury,
    toPay,
    {
      gasPrice: JSON.parse(gasPrice),
    },
  );

  const signer = usdtProvider.getSigner();
  let tx = await signer.sendTransaction(populatedTransaction);
  let res = await tx.wait();

  if (res) {
    console.log(res);
    await addTokenholderBalance(user, amountToBuy, contractAddress);
  } else {
    throw Error("Sending token with WalletConnect failed");
  }
}

async function checkFreeTokens(contractAddress: string, amountToBuy: number) {
  let freeBalance = await getFreeTokenBalance(contractAddress);
  if (freeBalance < amountToBuy) {
    throw Error("There is no free tokens");
  }
}

// ADMIN MENU
export async function unipassSendIncome(
  fromAddress: string,
  tokenAddress: string,
  amount: string,
) {
  const usdt = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
  const usdtDecimals = 1_000_000;
  const income = parseFloat(amount) * usdtDecimals;
  const data = new utils.Interface([
    "function transfer(address _to, uint256 _value)",
  ]).encodeFunctionData("transfer", [tokenAddress, income]);
  const tx = {
    from: fromAddress,
    to: usdt,
    value: "0x0",
    data: data,
  };
  let txHash = await unipassWallet.sendTransaction(tx);
  if (await checkTxStatus(txHash)) {
    console.log("send Token success", txHash);
    await updateIncome(tokenAddress, income);
  } else {
    console.error(`send Token failed, tx hash = ${txHash}`);
    throw Error("Sending token failed");
  }
}
