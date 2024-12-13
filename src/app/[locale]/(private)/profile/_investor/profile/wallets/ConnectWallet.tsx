"use client";

import { CreateSolanaWallet } from "@/app/[locale]/(private)/profile/_investor/profile/wallets/CreateSolanaWallet";
import { useWallet } from "@/providers/SolanaProvider";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { addUserWallet } from "@/services/users/investors/wallets";
import { Wallet } from "@/types/types";
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
} from "@starknet-react/core";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import s from "./Wallets.module.scss";

export function ConnectWallet(props: {
  connectedWallets: Wallet[];
  setConnectedWallets: Dispatch<SetStateAction<Wallet[]>>;
  setPrimaryWallet: Dispatch<SetStateAction<string>>;
}) {
  const t = useTranslations("ProfileInvestor.Profile");
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { setIsWalConnected } = useWallet();

  const [prevAddress, setPrevAddress] = useState("");
  const { connect, connectors } = useConnect();

  const [walletName, setWalletName] = useState("Braavos");
  const walletLinkNames = ["Argent X", "Braavos", "Solana"];
  const walletLinkList = ["https://www.argent.xyz/", "https://braavos.app/"];
  const walletLogosList = [
    "/logos/Argent.png",
    "/logos/Braavos.svg",
    "/logos/solana.png",
  ];

  useEffect(() => {
    setMounted(true);

    const wallet = props.connectedWallets.find(
      (wall) => wall.address === address && wall.name !== "Solona"
    );

    if (wallet) {
      return;
    }

    if (address && address !== prevAddress) {
      setPrevAddress(address);
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          addUserWallet(token, address, walletName)
            .then(() => {
              let newArray = [...props.connectedWallets];
              newArray.unshift({ name: walletName, address: address });
              props.setConnectedWallets(newArray);
              setIsWalConnected(false);
              props.setPrimaryWallet(walletName);
              toast.success(t("Toast.wallet_connected"));
            })
            .catch((error) => {
              console.log(error);
              toast.error(t("Toast.error_adding_wallet"));
            })
            .finally(() => {
              disconnect();
            });
        } else {
          disconnect();
          router.replace("/en/auth/login?expired-session=true");
        }
      });
    }
  }, [
    address,
    props,
    router,
    walletName,
    connectors,
    disconnect,
    prevAddress,
    t,
  ]);

  function connectWalletIfNew(name: string, connector: Connector) {
    // props.connectedWallets.map((w) => {
    //   if (w.name === name) {
    //     toast.info(t("Toast.address_already_exist"));
    //     return;
    //   }
    // });
    setWalletName(name);
    connect({ connector });
  }

  function WalletIcon(props: { path: string }) {
    return (
      <Image src={props.path} alt={"Wallet logo"} width={36} height={36} />
    );
  }

  return (
    <div className={s.walletList}>
      <p className={s.title}>{t("connect_wallet")}</p>
      {mounted &&
        connectors.map((connector: Connector, index) => {
          const available = connector.available();
          const name = walletLinkNames[index];
          return available ? (
            <div
              key={index.toString()}
              onClick={() => {
                connectWalletIfNew(name, connector);
              }}
              className={s.baseWalletRow}
            >
              <WalletIcon path={walletLogosList[index]} />
              <p className={s.walletName}>{name}</p>
            </div>
          ) : (
            <a
              key={index.toString()}
              href={walletLinkList[index]}
              target={"_blank"}
              className={s.baseWalletRow}
            >
              <WalletIcon path={walletLogosList[index]} />
              <p className={s.walletName}>{name}</p>
            </a>
          );
        })}

      <CreateSolanaWallet
        setConnectedWallets={props.setConnectedWallets}
        connectedWallets={props.connectedWallets}
        setPrimaryWallet={props.setPrimaryWallet}
      />
    </div>
  );
}

// "use client";

// import { firebaseAuth } from "@/services/auth/firebaseConfig";
// import { addUserWallet } from "@/services/users/investors/wallets";
// import { Wallet } from "@/types/types";
// import {
//   Connector,
//   useAccount,
//   useConnect,
//   useDisconnect,
// } from "@starknet-react/core";
// import { useTranslations } from "next-intl";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { toast } from "sonner";
// import s from "./Wallets.module.scss";

// export function ConnectWallet(props: {
//   connectedWallets: Wallet[];
//   setConnectedWallets: Dispatch<SetStateAction<Wallet[]>>;
//   setPrimaryWallet: Dispatch<SetStateAction<string>>;
// }) {
//   const t = useTranslations("ProfileInvestor.Profile");
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);
//   const { disconnect } = useDisconnect();

//   const { address } = useAccount();

//   const [prevAddress, setPrevAddress] = useState("");
//   const { connect, connectors } = useConnect();

//   const [walletName, setWalletName] = useState("Braavos");
//   const walletLinkNames = ["Braavos", "Argent X", "Argent mobile"];
//   const walletLinkList = [
//     "https://braavos.app/",
//     "https://www.argent.xyz/",
//     "https://www.argent.xyz/",
//   ];
//   const walletLogosList = [
//     "/logos/Braavos.svg",
//     "/logos/Argent-X.svg",
//     "/logos/Argent.png",
//   ];

//   useEffect(() => {
//     setMounted(true);

//     const wallet = props.connectedWallets.find(
//       (wall) => wall.address === address
//     );

//     if (wallet) {
//       return;
//     }

//     if (address && address !== prevAddress) {
//       setPrevAddress(address);
//       firebaseAuth.onAuthStateChanged(async (user) => {
//         if (user) {
//           const token = await user.getIdToken();
//           addUserWallet(token, address, walletName)
//             .then(() => {
//               let newArray = [...props.connectedWallets];
//               newArray.unshift({ name: walletName, address: address });
//               props.setConnectedWallets(newArray);
//               props.setPrimaryWallet(walletName);
//               toast.success(t("Toast.wallet_connected"));
//             })
//             .catch((error) => {
//               console.log(error);
//               toast.error(t("Toast.error_adding_wallet"));
//             })
//             .finally(() => {
//               disconnect();
//             });
//         } else {
//           disconnect();
//           router.replace("/en/auth/login?expired-session=true");
//         }
//       });
//     }
//   }, [
//     address,
//     props,
//     router,
//     walletName,
//     connectors,
//     disconnect,
//     prevAddress,
//     t,
//   ]);

//   function connectWalletIfNew(name: string, connector: Connector) {
//     // props.connectedWallets.map((w) => {
//     //   if (w.name === name) {
//     //     toast.info(t("Toast.address_already_exist"));
//     //     return;
//     //   }
//     // });
//     setWalletName(name);
//     connect({ connector });
//   }

//   function WalletIcon(props: { path: string }) {
//     return (
//       <Image src={props.path} alt={"Wallet logo"} width={36} height={36} />
//     );
//   }

//   return (
//     <div className={s.walletList}>
//       <p className={s.title}>{t("connect_wallet")}</p>
//       {mounted &&
//         connectors.map((connector: Connector, index) => {
//           const available = connector.available();
//           const name = walletLinkNames[index];
//           return available ? (
//             <div
//               key={index.toString()}
//               onClick={() => {
//                 connectWalletIfNew(name, connector);
//               }}
//               className={s.baseWalletRow}
//             >
//               <WalletIcon path={walletLogosList[index]} />
//               <p className={s.walletName}>{name}</p>
//             </div>
//           ) : (
//             <a
//               key={index.toString()}
//               href={walletLinkList[index]}
//               target={"_blank"}
//               className={s.baseWalletRow}
//             >
//               <WalletIcon path={walletLogosList[index]} />
//               <p className={s.walletName}>{name}</p>
//             </a>
//           );
//         })}
//     </div>
//   );
// }

// "use client";

// import { firebaseAuth } from "@/services/auth/firebaseConfig";
// import { addUserWallet } from "@/services/users/investors/wallets";
// import { Wallet } from "@/types/types";
// import {
//   Connector,
//   useAccount,
//   useConnect,
//   useDisconnect,
// } from "@starknet-react/core";
// import { useTranslations } from "next-intl";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { toast } from "sonner";
// import s from "./Wallets.module.scss";

// export function ConnectWallet(props: {
//   connectedWallets: Wallet[];
//   setConnectedWallets: Dispatch<SetStateAction<Wallet[]>>;
//   setPrimaryWallet: Dispatch<SetStateAction<string>>;
// }) {
//   const t = useTranslations("ProfileInvestor.Profile");
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);
//   const { disconnect } = useDisconnect();

//   const { address } = useAccount();

//   const [prevAddress, setPrevAddress] = useState("");
//   const { connect, connectors } = useConnect();

//   const [walletName, setWalletName] = useState("Braavos");
//   const walletLinkNames = ["Argent X", "Braavos"];
//   const walletLinkList = ["https://www.argent.xyz/", "https://braavos.app/"];
//   const walletLogosList = ["/logos/Argent.png", "/logos/Braavos.svg"];

//   useEffect(() => {
//     setMounted(true);

//     const wallet = props.connectedWallets.find(
//       (wall) => wall.address === address
//     );

//     if (wallet) {
//       return;
//     }

//     if (address && address !== prevAddress) {
//       setPrevAddress(address);
//       firebaseAuth.onAuthStateChanged(async (user) => {
//         if (user) {
//           const token = await user.getIdToken();
//           addUserWallet(token, address, walletName)
//             .then(() => {
//               let newArray = [...props.connectedWallets];
//               newArray.unshift({ name: walletName, address: address });
//               props.setConnectedWallets(newArray);
//               props.setPrimaryWallet(walletName);
//               toast.success(t("Toast.wallet_connected"));
//             })
//             .catch((error) => {
//               console.log(error);
//               toast.error(t("Toast.error_adding_wallet"));
//             })
//             .finally(() => {
//               disconnect();
//             });
//         } else {
//           disconnect();
//           router.replace("/en/auth/login?expired-session=true");
//         }
//       });
//     }
//   }, [
//     address,
//     props,
//     router,
//     walletName,
//     connectors,
//     disconnect,
//     prevAddress,
//     t,
//   ]);

//   function connectWalletIfNew(name: string, connector: Connector) {
//     // props.connectedWallets.map((w) => {
//     //   if (w.name === name) {
//     //     toast.info(t("Toast.address_already_exist"));
//     //     return;
//     //   }
//     // });
//     setWalletName(name);
//     connect({ connector });
//   }

//   function WalletIcon(props: { path: string }) {
//     return (
//       <Image src={props.path} alt={"Wallet logo"} width={36} height={36} />
//     );
//   }

//   return (
//     <div className={s.walletList}>
//       <p className={s.title}>{t("connect_wallet")}</p>
//       {mounted &&
//         connectors.map((connector: Connector, index) => {
//           const available = connector.available();
//           const name = walletLinkNames[index];
//           return available ? (
//             <div
//               key={index.toString()}
//               onClick={() => {
//                 connectWalletIfNew(name, connector);
//               }}
//               className={s.baseWalletRow}
//             >
//               <WalletIcon path={walletLogosList[index]} />
//               <p className={s.walletName}>{name}</p>
//             </div>
//           ) : (
//             <a
//               key={index.toString()}
//               href={walletLinkList[index]}
//               target={"_blank"}
//               className={s.baseWalletRow}
//             >
//               <WalletIcon path={walletLogosList[index]} />
//               <p className={s.walletName}>{name}</p>
//             </a>
//           );
//         })}
//     </div>
//   );
// }
