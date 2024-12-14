import { Select } from "@/components/Select/Select";
import { Button } from "@/components/ui/Button/Button";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { withdrwFetch } from "@/services/users/investors/wallets";
import { useBalanceStore } from "@/store/balance";
import getTokens from "@/utils/getTokens";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import "./WithdrawPopup.scss";

const { tokenOptions } = getTokens();

const WithdrawPopup = ({
  handleGetBalances,
}: {
  handleGetBalances: () => void;
}) => {
  const t = useTranslations("ProfileInvestor.Balance");

  const { setTopUpStep, balanceList } = useBalanceStore();
  const [token, setToken] = useState(tokenOptions[0]);

  let amountToken =
    balanceList.find((item) => item.currency.symbol === token.value)?.balance ||
    0;

  const [address, setAddres] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [load, setLoad] = useState(false);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!address.trim()) {
      setError("address");
      return toast.error(t("failed"));
    }

    if (!amount.trim()) {
      setError("amount");
      return toast.error(t("failed"));
    }

    setLoad(true);

    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const userToken = await user.getIdToken();
        withdrwFetch(userToken, {
          amount: amount,
          currency: token.value,
          address: address,
        })
          .then((res) => {
            toast.success(t(`successful`));
            handleGetBalances();
          })
          .catch((error) => {
            if (error.response.data === "Not enough balance") {
              toast.error(t(`notBalance`));
            } else {
              toast.error(t(`failed`));
            }
          })
          .finally(() => {
            setLoad(false);
            setTopUpStep(null);
          });
      }
    });
  };

  return (
    <div
      className={"overlay"}
      onClick={(e) => {
        e.stopPropagation();
        setTopUpStep(null);
      }}
    >
      <div className={"popupWithdraw"} onClick={(e) => e.stopPropagation()}>
        <h2>{t("send")}</h2>

        <div className={"currencyContainer"}>
          <form onSubmit={handleSubmit}>
            <div className="containerItem">
              <h4>{t("address")}</h4>
              <input
                onChange={(e) => {
                  setError(null);
                  setAddres(e.target.value);
                }}
                value={address}
                className={`${error === "address" ? "error" : ""}`}
                type="text"
                placeholder={t("pasteAddress")}
              />
            </div>
            <div className="containerItem">
              <h4>{t("network")}</h4>

              <Select
                value={token.value}
                onChange={(option) =>
                  setToken({
                    contractAddress: option.contractAddress!,
                    value: option.value,
                    label: option.label,
                    image: option.image,
                  })
                }
                options={tokenOptions}
                className="select"
              />
            </div>
            <div className="containerItem">
              <h4>{t("withdrawAmount")}</h4>
              <input
                onChange={(e) => {
                  if (/^\d*\.?\d*$/.test(e.target.value)) {
                    setAmount(e.target.value);
                    setError(null);
                  }
                }}
                className={`${error === "amount" ? "error" : ""}`}
                value={amount}
                type="text"
                placeholder={t("amount")}
              />
            </div>
            <div className="available">
              <p>{t("available")} </p>
              <p>
                {amountToken} {token.value}
              </p>
            </div>
            <div className="sendBlock">
              <div className="line"></div>
              <Button
                title={t("withdraw")}
                arrow={false}
                color={load ? "loading" : "main"}
                type={load ? "button" : "submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPopup;
