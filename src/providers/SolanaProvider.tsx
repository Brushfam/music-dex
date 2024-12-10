// import {
//   Connection,
//   PublicKey,
//   SystemProgram,
//   Transaction,
//   clusterApiUrl,
// } from "@solana/web3.js";
// import { useEffect, useState } from "react";

// export const useSolanaWallet = () => {
//   const [provider, setProvider] = useState<Connection | null>(null);
//   const [wallet, setWallet] = useState<any>(null);
//   const [account, setAccount] = useState<PublicKey | null>(null);
//   const [isWalletConnected, setIsWalletConnected] = useState(false);

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
//         const connectedAccount = await wallet.connect();
//         setAccount(connectedAccount.publicKey);
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

//         const signedTransaction = await wallet.signTransaction(transaction);

//         const txId = await provider.sendTransaction(signedTransaction, [], {
//           skipPreflight: false,
//         });

//         console.log("Transaction sent:", txId);
//       } catch (error) {
//         console.error("Failed to send transaction:", error);
//       }
//     }
//   };

//   return {
//     connectWallet,
//     sendTransaction,
//     account,
//     isWalletConnected,
//   };
// };

"use client";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import React, { createContext, useContext, useEffect, useState } from "react";

// Типы данных
interface SolanaWalletContextType {
  connectWallet: () => Promise<void>;
  sendTransaction: (toPublicKey: string, amount: number) => Promise<void>;
  account: PublicKey | null;
  isWalletConnected: boolean;
}

// Создаем контекст
const SolanaWalletContext = createContext<SolanaWalletContextType | null>(null);

// Хук для доступа к контексту
export const useWallet = (): SolanaWalletContextType => {
  const context = useContext(SolanaWalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a SolanaWalletProvider");
  }
  return context;
};

// Провайдер контекста
export const SolanaWalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [provider, setProvider] = useState<Connection | null>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [account, setAccount] = useState<PublicKey | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Инициализация подключения
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
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  const sendTransaction = async (toPublicKey: string, amount: number) => {
    if (account && provider && wallet) {
      try {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: account,
            toPubkey: new PublicKey(toPublicKey),
            lamports: amount,
          })
        );

        const signedTransaction = await wallet.signTransaction(transaction);
        const txId = await provider.sendTransaction(signedTransaction, [], {
          skipPreflight: false,
        });

        console.log("Transaction sent:", txId);
      } catch (error) {
        console.error("Failed to send transaction:", error);
      }
    }
  };

  // Значение контекста
  const value: SolanaWalletContextType = {
    connectWallet,
    sendTransaction,
    account,
    isWalletConnected,
  };

  return (
    <SolanaWalletContext.Provider value={value}>
      {children}
    </SolanaWalletContext.Provider>
  );
};
