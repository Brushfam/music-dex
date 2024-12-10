// "use client";
// import React from "react";

// import { mainnet, sepolia } from "@starknet-react/chains";
// import {
//   StarknetConfig,
//   publicProvider,
//   starkscan,
// } from "@starknet-react/core";
// import { ArgentMobileConnector } from "starknetkit/argentMobile";
// import { InjectedConnector } from "starknetkit/injected";

// export function StarknetProvider({ children }: { children: React.ReactNode }) {
//   const connectors = [
//     new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
//     new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
//     new ArgentMobileConnector(),
//   ];

//   return (
//     <StarknetConfig
//       chains={[mainnet, sepolia]}
//       provider={publicProvider()}
//       connectors={connectors}
//       explorer={starkscan}
//     >
//       {children}
//     </StarknetConfig>
//   );
// }
"use client";
import React from "react";

import { mainnet, sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  publicProvider,
  useInjectedConnectors,
  voyager,
} from "@starknet-react/core";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "always",
    order: "alphabetical",
  });

  console.log(connectors);

  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={publicProvider()}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
