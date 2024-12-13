"use client";

import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { transactionSend } from "@/services/users/investors/wallets";
import { useBalanceStore } from "@/store/balance";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { useTranslations } from "next-intl";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
const solAddress = process.env.NEXT_PUBLIC_SOL_ADDRES;

if (!solAddress) {
  throw new Error("Solana address not provided in environment variables");
}
interface SolanaWalletContextType {
  connectWallet: () => Promise<void>;
  sendTransaction: (amount: number) => Promise<void>;
  getUserBalance: () => Promise<number | null>;
  account: PublicKey | null;
  isWalletConnected: boolean;
  isWalConnected: boolean;
  setIsWalConnected: (st: boolean) => void;
}

const SolanaWalletContext = createContext<SolanaWalletContextType | null>(null);

export const useWallet = (): SolanaWalletContextType => {
  const context = useContext(SolanaWalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a SolanaWalletProvider");
  }
  return context;
};

export const SolanaWalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [provider, setProvider] = useState<Connection | null>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [account, setAccount] = useState<PublicKey | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isWalConnected, setIsWalConnected] = useState(false);
  const t = useTranslations("ProfileInvestor.Balance");
  const { setTopUpStep } = useBalanceStore();

  useEffect(() => {
    const solanaConnection = new Connection(clusterApiUrl("devnet"));
    setProvider(solanaConnection);

    if (window.solana && window.solana.isPhantom) {
      setWallet(window.solana);
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
    }
  }, []);

  const connectWallet = async () => {
    if (wallet) {
      try {
        await wallet.connect();
        setAccount(wallet.publicKey);
        setIsWalConnected(true);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  const sendTransaction = async (amount: number) => {
    if (account && provider && wallet) {
      try {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: account,
            toPubkey: new PublicKey(solAddress),
            lamports: amount * 10 ** 9,
          })
        );

        const { blockhash, lastValidBlockHeight } =
          await provider.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = account;

        const signedTransaction = await wallet.signTransaction(transaction);

        const txId = await provider.sendRawTransaction(
          signedTransaction.serialize(),
          { skipPreflight: false }
        );

        await provider.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature: txId,
        });

        firebaseAuth.onAuthStateChanged(async (user) => {
          if (user) {
            const userToken = await user.getIdToken();
            transactionSend(userToken, {
              method: "wallet",
              amount: amount,
              currency: "SOL",
              txHash: txId,
              fromAddress: account.toString(),
            })
              .then(() => {
                toast.success(t("successful"));
              })
              .catch((error) => {
                toast.error(t(`failed`));
              })
              .finally(() => {
                setTopUpStep(null);
              });
          }
        });
      } catch (error) {
        console.log(error);
        toast.error(t(`failed`));
        setTopUpStep(null);
      }
    }
  };

  const getUserBalance = async (): Promise<number | null> => {
    if (account && provider) {
      try {
        const balance = await provider.getBalance(account);
        return balance / 1_000_000_000; // Перевод из лампортов в SOL
      } catch (error) {
        console.error("Failed to fetch user balance:", error);
        return null;
      }
    }
    return null;
  };

  const value: SolanaWalletContextType = {
    connectWallet,
    sendTransaction,
    getUserBalance,
    account,
    isWalletConnected,
    isWalConnected,
    setIsWalConnected,
  };

  return (
    <SolanaWalletContext.Provider value={value}>
      {children}
    </SolanaWalletContext.Provider>
  );
};

// "use client";
// import { useBalanceStore } from "@/store/balance";
// import {
//   Connection,
//   PublicKey,
//   SystemProgram,
//   Transaction,
//   clusterApiUrl,
// } from "@solana/web3.js";
// import { useTranslations } from "next-intl";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { toast } from "sonner";

// interface SolanaWalletContextType {
//   connectWallet: () => Promise<void>;
//   sendTransaction: (toPublicKey: string, amount: number) => Promise<void>;
//   account: PublicKey | null;
//   isWalletConnected: boolean;
//   isWalConnected: boolean;
//   setIsWalConnected: (st: boolean) => void;
// }

// const SolanaWalletContext = createContext<SolanaWalletContextType | null>(null);

// export const useWallet = (): SolanaWalletContextType => {
//   const context = useContext(SolanaWalletContext);
//   if (!context) {
//     throw new Error("useWallet must be used within a SolanaWalletProvider");
//   }
//   return context;
// };

// export const SolanaWalletProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [provider, setProvider] = useState<Connection | null>(null);
//   const [wallet, setWallet] = useState<any>(null);
//   const [account, setAccount] = useState<PublicKey | null>(null);
//   const [isWalletConnected, setIsWalletConnected] = useState(false);
//   const [isWalConnected, setIsWalConnected] = useState(false);
//   const t = useTranslations("ProfileInvestor.Balance");
//   const { setTopUpStep, method } = useBalanceStore();
//   useEffect(() => {
//     const solanaConnection = new Connection(clusterApiUrl("devnet"));
//     setProvider(solanaConnection);

//     if (window.solana && window.solana.isPhantom) {
//       setWallet(window.solana);
//       setIsWalletConnected(true);
//     } else {
//       setIsWalletConnected(false);
//     }
//   }, []);

//   const connectWallet = async () => {
//     if (wallet) {
//       try {
//         await wallet.connect();
//         setAccount(wallet.publicKey);
//         setIsWalConnected(true);
//       } catch (error) {
//         console.error("Failed to connect wallet:", error);
//       }
//     }
//   };
//   const sendTransaction = async (toPublicKey: string, amount: number) => {
//     if (account && provider && wallet) {
//       try {
//         const transaction = new Transaction().add(
//           SystemProgram.transfer({
//             fromPubkey: account,
//             toPubkey: new PublicKey(toPublicKey),
//             lamports: amount,
//           })
//         );

//         // Получение latestBlockhash
//         const { blockhash, lastValidBlockHeight } =
//           await provider.getLatestBlockhash();
//         transaction.recentBlockhash = blockhash;
//         transaction.feePayer = account;

//         // Подпись транзакции
//         const signedTransaction = await wallet.signTransaction(transaction);

//         // Отправка транзакции
//         const txId = await provider.sendRawTransaction(
//           signedTransaction.serialize(),
//           {
//             skipPreflight: false,
//           }
//         );

//         console.log("Transaction sent:", txId);

//         const confirmation = await provider.confirmTransaction({
//           blockhash,
//           lastValidBlockHeight,
//           signature: txId,
//         });

//         console.log(confirmation);
//         console.log(txId);

//         toast.success(t("successful"));
//         setTopUpStep(null);
//       } catch (error) {
//         toast.error(t(`failed`));
//         setTopUpStep(null);
//       }
//     }
//   };

//   const value: SolanaWalletContextType = {
//     connectWallet,
//     sendTransaction,
//     account,
//     isWalletConnected,
//     isWalConnected,
//     setIsWalConnected,
//   };

//   return (
//     <SolanaWalletContext.Provider value={value}>
//       {children}
//     </SolanaWalletContext.Provider>
//   );
// };
