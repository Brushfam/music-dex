// const recipientAddress = "0x052c20aa2112b97f2d9f2a7788651c0c8d85ab382dbf8570f6ff594b77aa3a81"; //braavol

type tokenOptions = {
  value: string;
  label: string;
  image: string;
  contractAddress: `0x${string}`;
};
const tokenOptions = [
  {
    value: "USDT",
    label: "USDT",
    image: "/profile/balance/usdt.png",
    contractAddress:
      "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
  },
  {
    value: "SOL",
    label: "SOL",
    image: "/profile/balance/sol.png",
    contractAddress:
      "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
  },
  {
    value: "USDC",
    label: "USDC",
    image: "/profile/balance/usdc.png",
    contractAddress: "FSxJ85FXVsXSr51SeWf9ciJWTcRnqKFSmBgRDeL3KyWw",
  },
  {
    value: "STRK",
    label: "STRK",
    image: "/profile/balance/strk.png",
    contractAddress:
      "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
  },
  {
    value: "ETH",
    label: "ETH",
    image: "/profile/balance/eth.png",
    contractAddress:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  },
] as tokenOptions[];

const getTokens = () => {
  return { tokenOptions };
};

export default getTokens;
