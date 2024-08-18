"use client";
import React from "react";

import { mainnet } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  starkscan,
} from "@starknet-react/core";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { InjectedConnector } from "starknetkit/injected";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const connectors = [
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
    new ArgentMobileConnector(),
  ];

  return (
    <StarknetConfig
      chains={[mainnet]}
      provider={publicProvider()}
      connectors={connectors}
      explorer={starkscan}
    >
      {children}
    </StarknetConfig>
  );
}
