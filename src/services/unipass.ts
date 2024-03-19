import { UniPassPopupSDK } from "@unipasswallet/popup-sdk";
import { UniPassTheme, UPEvent, UPEventType } from "@unipasswallet/popup-types";
import { Contract, providers, utils, Wallet } from "ethers";
import { parseEther } from "ethers/lib/utils";
import {
  baseContractAbi,
  baseContractAddress,
  songContractAbi,
  songContractAddress,
} from "@/data/contractsData";

const unipassWallet = new UniPassPopupSDK({
  env: "test",
  chainType: "polygon",
  storageType: "localStorage",
  appSettings: {
    theme: UniPassTheme.DARK,
    appName: "wallet integration demo",
    appIcon: "",
  },
});

function getBaseSigner() {
  const basePrivateKey =
    process.env.NEXT_PUBLIC_TEST_KEY ?? process.env.BASE_KEY;
  if (!basePrivateKey) {
    throw new Error("Base key is empty");
  }

  const baseAccount = utils.HDNode.fromMnemonic(basePrivateKey).derivePath(
    `m/44'/60'/0'/0/${0}`,
  );
  let _testProvider = new providers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com/",
  );
  return new Wallet(baseAccount, unipassWallet.getProvider());
}

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

export async function unipassSignMessage(message: string) {
  try {
    const options = { isEIP191Prefix: false, onAuthChain: true };
    const sig = await unipassWallet.signMessage(message, options);
    console.log("signature: " + sig);
    return sig;
  } catch (err) {
    console.log("auth err", err);
  }
}

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

export async function signAgreement(user: string) {
  const baseToken = new Contract(
    baseContractAddress,
    baseContractAbi,
    getBaseSigner(),
  );
  let signTx = await baseToken.signAgreement(user);
  console.log(signTx);
}

export async function hasAgreement(user: string) {
  const baseToken = new Contract(
    baseContractAddress,
    baseContractAbi,
    getBaseSigner(),
  );
  return await baseToken.hasAgreement(user);
}

export async function unipassLogout() {
  await unipassWallet.logout(false);
}

// SONG PAGE
export async function getFreeTokenBalance(tokenAddress: string) {
  const songToken = new Contract(
    tokenAddress,
    songContractAbi,
    getBaseSigner(),
  );
  let signTx = await songToken.getFreeTokenBalance();
  return signTx.toNumber();
}

async function addTokenholderBalance(
  user: string,
  amount: number,
  contractAddress: string,
) {
  const songToken = new Contract(
    contractAddress,
    songContractAbi,
    getBaseSigner(),
  );
  let signTx = await songToken.addTokenholderBalance(user, amount);
  console.log(signTx);
}

async function checkFreeTokens(contractAddress: string, amountToBuy: number) {
  let freeBalance = await getFreeTokenBalance(contractAddress);
  if (freeBalance < amountToBuy) {
    throw Error("There is no free tokens");
  }
}

export async function unipassBuyTokens(
  user: string,
  amountToPay: string,
  amountToBuy: number,
  contractAddress: string,
) {
  try {
    await checkFreeTokens(contractAddress, amountToBuy);
    const tx = {
      from: user,
      to: "0xBb39B8fe384Bad8Bd60Eb68EbCDE4F0569fC2017",
      value: parseEther(amountToPay).toHexString(),
      data: "0x",
    };
    let txHash = await unipassWallet.sendTransaction(tx);
    if (await checkTxStatus(txHash)) {
      console.log("send Native Token success", txHash);
      await addTokenholderBalance(user, amountToBuy, contractAddress);
    } else {
      console.error(`send Native Token failed, tx hash = ${txHash}`);
    }
  } catch (err) {
    console.log("err", err);
  }
}

// USER MENU
export async function getUserBalance(address: string, tokenAddress: string) {
  const songToken = new Contract(
    tokenAddress,
    songContractAbi,
    getBaseSigner(),
  );
  let signTx = await songToken.getUserBalance(address);
  return signTx.toNumber();
}

export async function getUserTotalEarned(
  address: string,
  tokenAddress: string,
) {
  const songToken = new Contract(
    tokenAddress,
    songContractAbi,
    getBaseSigner(),
  );
  let signTx = await songToken.getUserTotalEarned(address);
  return utils.formatEther(signTx);
}

export async function getUserTokensData(
  userAddress: string,
  addressesArray: string[],
) {
  type userTokensData = { amount: number; earning: number };
  let promisesArray: userTokensData[] = [];

  for (let i = 0; i < addressesArray.length; i += 1) {
    let amount = await getUserBalance(userAddress, addressesArray[i]);
    let earning = await getUserTotalEarned(userAddress, addressesArray[i]);
    promisesArray.push({ amount: amount, earning: parseFloat(earning) });
  }

  return promisesArray;
}

// ADMIN MENU
export async function sendIncomeOwner(amount: string) {
  const songToken = new Contract(
    songContractAddress,
    songContractAbi,
    getBaseSigner(),
  );
  let signTx = await songToken.sendIncome({ value: utils.parseEther(amount) });
  console.log(signTx);
}

export async function getTestTokens(ethersTo: string) {
  const ownerSigner = getBaseSigner();
  let amount = utils.parseEther("0.001");
  let tx = {
    to: ethersTo,
    value: amount,
  };
  let sendPromise = ownerSigner.sendTransaction(tx);

  try {
    const sendTx = await sendPromise;
    console.log(sendTx);
    return true;
  } catch (err) {
    console.log("err", err);
    return false;
  }
}

export async function sendIncome(
  fromAddress: string,
  tokenAddress: string,
  amount: string,
) {
  const data = new utils.Interface([
    "function sendIncome()",
  ]).encodeFunctionData("sendIncome", []);
  const tx = {
    from: fromAddress,
    to: tokenAddress,
    value: parseEther(amount).toHexString(),
    data: data,
  };
  let txHash = await unipassWallet.sendTransaction(tx);
  if (await checkTxStatus(txHash)) {
    console.log("send Token success", txHash);
  } else {
    console.error(`send Token failed, tx hash = ${txHash}`);
    throw Error("Sending token failed");
  }
}
