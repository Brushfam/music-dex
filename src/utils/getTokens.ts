const recipientAddress =
  "0x0081789107e2ab3490f92460eb27ff520904621e926206d710731ec626f1ac55"; // argent

// const recipientAddress = "0x052c20aa2112b97f2d9f2a7788651c0c8d85ab382dbf8570f6ff594b77aa3a81"; //braavol

type tokenOptions = {
  value: string;
  label: string;
  image: string;
  contractAddress: `0x${string}`;
};
const tokenOptions = [
  {
    value: "usdt",
    label: "USDT",
    image: "/profile/balance/tether.png",
    contractAddress: "ust",
  },
  {
    value: "eth",
    label: "ETH",
    image: "/profile/balance/eth.png",
    contractAddress:
      "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
  },
  {
    value: "strk",
    label: "STRK",
    image: "/profile/balance/tether.png",
    contractAddress:
      "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
  },
] as tokenOptions[];

const getTokens = () => {
  return { tokenOptions, recipientAddress };
};

export default getTokens;
