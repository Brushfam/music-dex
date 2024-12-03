import Image from "next/image";

export const BalanceIcon = (props: { color: string }) =>
  props.color === "white" ? (
    <Image src={"/profile/balance/balance.svg"} alt="" width={18} height={18} />
  ) : (
    <Image
      src={"/profile/balance/balance-active.svg"}
      alt=""
      width={18}
      height={18}
    />
  );
