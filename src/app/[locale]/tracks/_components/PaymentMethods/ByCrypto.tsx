import {Dispatch, SetStateAction, useState} from "react";
import { Button } from "@/components/ui/Button/Button";
import { unipassBuyTokens } from "@/services/unipass";

export function ByCrypto(props: {
  user: string;
  tokensToPay: string;
  tokensToBuy: number;
  address: string;
}) {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <Button
      title={"Transaction executing..."}
      color={"loading"}
      arrow={false}
    />
  ) : (
    <Button
      title={"Purchase by Crypto"}
      color={"main"}
      arrow={true}
      action={async () => {
        setLoading(true);
        await unipassBuyTokens(
          props.user,
          props.tokensToPay,
          props.tokensToBuy,
          props.address,
        );
        setLoading(false);
      }}
    />
  );
}
