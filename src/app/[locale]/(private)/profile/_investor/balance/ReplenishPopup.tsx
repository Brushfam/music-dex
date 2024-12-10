import { Select } from "@/components/Select/Select";
import { Button } from "@/components/ui/Button/Button";
import { TopUpStepEnum, useBalanceStore } from "@/store/balance";

import { useTranslations } from "next-intl";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import styles from "./Balance.module.scss";
import { Popup } from "./Popup";

import getTokens from "@/utils/getTokens";

import {
  useAccount,
  useContract,
  useSendTransaction,
} from "@starknet-react/core";
import { toast } from "sonner";
import type { Abi } from "starknet";

const { tokenOptions, recipientAddress } = getTokens();

const convertUsdToStrk = (
  usdAmount: number,
  decimals: number,
  exchangeRate: number
) => {
  const tokenAmount = (usdAmount * exchangeRate * 10 ** decimals).toFixed(0);
  return tokenAmount; // Преобразуем строку в BigInt
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
] as const satisfies Abi;

export function ReplenishPopup() {
  const t = useTranslations("ProfileInvestor.Balance");
  const { account } = useAccount();

  const { setTopUpStep, method } = useBalanceStore();

  const [amount, setAmount] = useState(1);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [token, setToken] = useState(tokenOptions[0]);

  const handleDecrease = () => {
    if (amount > 10) setAmount(amount - 1);
  };

  const handleIncrease = () => {
    if (amount < 1000) setAmount(amount + 1);
  };
  const handleSliderChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const value = Number(e.target.value);

      if (!value) {
        return;
      }

      setAmount(value);
    },
    []
  );
  const { contract } = useContract({
    abi,
    address: token.contractAddress,
  });
  const { address } = useAccount();
  const [decimals, setDecimals] = useState<number>(18);
  useEffect(() => {
    const fetchDecimals = async () => {
      if (contract) {
        try {
          const result = await contract.call("decimals");
          setDecimals(Number(result.decimals));
        } catch (error) {
          console.error("Error fetching decimals:", error);
        }
      }
    };
    fetchDecimals();
  }, [contract]);

  const { sendAsync, error, data, variables } = useSendTransaction({
    calls:
      contract && address
        ? [
            {
              contractAddress: token.contractAddress,
              entrypoint: "transfer",
              calldata: [recipientAddress, amount * 10 ** decimals, "0"],
            },
          ]
        : undefined,
  });

  const handleClick = async () => {
    console.log(decimals);

    if (method === "wallet") {
      try {
        const txResponse = await sendAsync();

        console.log(data);
        console.log(variables);

        if (error) {
          throw new Error(error.message);
        }

        console.log("Transaction successful:", txResponse);
        console.log(txResponse.transaction_hash);
        toast.success(t("successful"));
        setTopUpStep(null);
      } catch (err: any) {
        toast.error(t(`failed`));
        setTopUpStep(null);
      }
    } else {
      console.log("whitepay");
    }
  };
  return (
    <Popup title={t("enter")}>
      <div className={styles.replenishContainer}>
        <div className={styles.amountContainer}>
          <h3>{t("enterAmount")}</h3>
          <div className={styles.amountInput}>
            <button onClick={handleDecrease}>-</button>
            <span className={styles.amount}>{amount}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <div className={styles.sliderContainer}>
            <span>1 {t("min")}</span>
            <input
              type="range"
              min="1"
              max="100"
              value={amount}
              onChange={handleSliderChange}
              className={styles.slider}
            />
            <span>100 {t("max")}</span>
          </div>
        </div>
        {method === "wallet" && (
          <div className={styles.currencyContainer}>
            <h3>{t("currency")}</h3>
            <Select
              value={token.value}
              onChange={(option) => setToken(option)}
              options={tokenOptions}
            />
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

// const handleClick = async () => {
//   const contractAddress =
//     "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

//   const { abi } = await provider.getClassAt(contractAddress, "latest");
//   if (!abi) {
//     throw new Error("Failed to retrieve ABI.");
//   }
//   console.log(abi);

//   const contract = new Contract(
//     [
//       {
//         name: "transfer",
//         type: "function",
//         inputs: [
//           { name: "to", type: "address" },
//           { name: "amount", type: "uint256" },
//         ],
//         outputs: [{ name: "success", type: "bool" }],
//       },
//     ],
//     contractAddress,
//     provider
//   );
//   contract.connect(account!);

//   const calldata = [
//     BigInt(
//       "0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D"
//     ).toString(),
//     BigInt(12).toString(),
//   ];

//   try {
//     const ex = await account?.execute({
//       contractAddress,
//       entrypoint: "transfer",
//       calldata,
//     });
//     if (!ex) {
//       return;
//     }

//     const res = await provider.waitForTransaction(ex.transaction_hash);
//     console.log("Transaction successful:", res);
//   } catch (err) {
//     toast.error("Transaction failed.");
//     setTopUpStep(null);
//   }
// };

// const { sendAsync, error, data, variables } = useSendTransaction({
//   calls:
//     contract && address
//       ? [
//           contract.populate("transfer", [
//             recipientAddress,
//             BigInt(amount) * BigInt(10 ** 18),
//           ]),
//         ]
//       : undefined,
// });
