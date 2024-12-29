import { Select } from "@/components/Select/Select";
import { Button } from "@/components/ui/Button/Button";

import { useWallet } from "@/providers/SolanaProvider";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { transactionSend } from "@/services/users/investors/wallets";
import { TopUpStepEnum, useBalanceStore } from "@/store/balance";

import getTokens from "@/utils/getTokens";
import {
  useAccount,
  useContract,
  useSendTransaction,
} from "@starknet-react/core";

import { useTranslations } from "next-intl";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Abi } from "starknet";
import styles from "./Balance.module.scss";
import { Popup } from "./Popup";

const { tokenOptions } = getTokens();
const openInNewTab = (url: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
const abi = [
  {
    type: "function",
    name: "transfer",
    state_mutability: "external",
    inputs: [
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "decimals",
    state_mutability: "view",
    inputs: [],
    outputs: [
      {
        name: "decimals",
        type: "felt",
      },
    ],
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
    state_mutability: "view",
  },
] as const satisfies Abi;

export function ReplenishPopup({
  handleGetBalances,
}: {
  handleGetBalances: () => void;
}) {
  const t = useTranslations("ProfileInvestor.Balance");
  const { sendTransaction, sendUSDCTransaction, isWalConnected } = useWallet();
  const { address } = useAccount();
  let filteredTokens = tokenOptions.filter((item) => {
    if (isWalConnected && (item.label === "SOL" || item.label === "USDC")) {
      return item;
    } else if (
      !isWalConnected &&
      item.label !== "SOL" &&
      item.label !== "USDT" &&
      item.label !== "USDC"
    ) {
      return item;
    }
  });

  const { setTopUpStep, method } = useBalanceStore();

  const [amountToken, setAmountToken] = useState<number | string>(0);
  const [token, setToken] = useState(filteredTokens[0]);
  const [amountW, setAmountW] = useState<number | string>(5);

  const handleDecrease = () => {
    if (+amountW > 5) setAmountW(+amountW - 1);
  };

  const handleIncrease = () => {
    if (+amountW < 10000) setAmountW(+amountW + 1);
  };
  const handleSliderChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const value = Number(e.target.value);

      if (!value) {
        return;
      }

      setAmountW(value);
    },
    []
  );

  const { contract } = useContract({
    abi,
    address: token.contractAddress,
  });

  const [decimals, setDecimals] = useState<number>(18);
  useEffect(() => {
    const fetchDecimals = async () => {
      if (contract && !isWalConnected) {
        try {
          const result = await contract.call("decimals");
          setDecimals(Number(result.decimals));
        } catch (error) {
          console.error("Error fetching decimals:", error);
        }
      }
    };
    fetchDecimals();
  }, [contract, isWalConnected]);

  type Call = {
    contractAddress: string;
    entrypoint: string;
    calldata: (string | number)[];
  };
  const { sendAsync, error, data, variables } = useSendTransaction({
    calls:
      !isWalConnected && contract && address
        ? ([
            {
              contractAddress: token.contractAddress,
              entrypoint: "transfer",
              calldata: [
                process.env.NEXT_PUBLIC_STRK_ADDRES,
                +amountToken * 10 ** decimals,
                "0",
              ],
            },
          ] as Call[])
        : undefined,
  });

  const handleClick = async () => {
    if (method === "wallet") {
      if (isWalConnected) {
        if (token.label === "USDC") {
          sendUSDCTransaction(+amountToken).then(() => {
            handleGetBalances();
          });
        } else {
          sendTransaction(+amountToken).then(() => {
            handleGetBalances();
          });
        }
      } else {
        try {
          const txResponse = await sendAsync();
          if (error) {
            throw new Error(error.message);
          }

          firebaseAuth.onAuthStateChanged(async (user) => {
            if (user) {
              const userToken = await user.getIdToken();
              transactionSend(userToken, {
                method: "wallet",
                amount: +amountToken,
                currency: token.label,
                txHash: txResponse.transaction_hash,
                fromAddress: address,
              })
                .then(() => {
                  toast.success(t("successful"));
                  handleGetBalances();
                })
                .catch((error) => {
                  toast.error(t(`failed`));
                })
                .finally(() => {
                  setTopUpStep(null);
                });
            }
          });
        } catch (err: any) {
          toast.error(t(`failed`));
          setTopUpStep(null);
        }
      }
    } else {
      if (+amountW < 5) {
        setAmountW(5);
        toast.error(t(`failedMin`));
        return;
      } else if (+amountW > 10000) {
        setAmountW(10000);

        toast.error(t(`failedMax`));

        return;
      }
      const user = firebaseAuth.currentUser;
      if (user) {
        try {
          const userToken = await user.getIdToken();
          const res = await transactionSend(userToken, {
            method: "whitepay",
            amount: +amountW,
            currency: "USDT",
          });
          const link = document.createElement("a");
          link.href = res.data.orderUrl;
          link.target = "_blank";
          link.rel = "noopener noreferrer";

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error("Transaction Error:", error);
          toast.error(t(`failed`));
        } finally {
          setTopUpStep(null);
        }
      }
    }
  };
  return (
    <Popup title={t("enter")}>
      <div className={styles.replenishContainer}>
        {method === "wallet" ? (
          <>
            <div className={styles.amountContainer}>
              <h3>{t("enterAmount")}</h3>
              <div className={styles.amountInput}>
                <input
                  value={amountToken}
                  onChange={(e) => {
                    if (/^\d*\.?\d*$/.test(e.target.value)) {
                      if (+e.target.value > 0) {
                        setAmountToken(+e.target.value);
                      } else {
                        setAmountToken(0);
                      }
                    }
                  }}
                  type="text"
                  className={styles.amount}
                />
              </div>
            </div>

            <div className={styles.currencyContainer}>
              <h3>{t("currency")}</h3>
              <Select
                value={token.value}
                onChange={(option) =>
                  setToken({
                    contractAddress: option.contractAddress!,
                    value: option.value,
                    label: option.label,
                    image: option.image,
                  })
                }
                options={filteredTokens}
              />
            </div>
          </>
        ) : (
          <div className={styles.amountContainer}>
            <h3>{t("enterAmount")}</h3>
            <div className={styles.amountInput}>
              <button onClick={handleDecrease}>-</button>
              <label className={styles.amountLabel}>
                <input
                  value={amountW}
                  onChange={(e) => {
                    if (/^\d*\.?\d*$/.test(e.target.value)) {
                      if (+e.target.value > 0) {
                        setAmountW(+e.target.value);
                      } else {
                        setAmountW(0);
                      }
                    }
                  }}
                  type="text"
                />
                <p>$</p>
              </label>
              <button onClick={handleIncrease}>+</button>
            </div>
            <div className={styles.sliderContainer}>
              <span>5 $ {t("min")}</span>
              <input
                type="range"
                min="5"
                max="10000"
                value={amountW}
                onChange={handleSliderChange}
                className={styles.slider}
              />
              <span>10 000 $ {t("max")}</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles?.replenishBtnGroup}>
        <Button
          title={t("back")}
          color="main"
          arrow={false}
          action={() => setTopUpStep(TopUpStepEnum.CHOICE)}
        />
        <Button
          action={handleClick}
          title={t("replenish")}
          color="grey"
          arrow={true}
        />
      </div>
    </Popup>
  );
}
