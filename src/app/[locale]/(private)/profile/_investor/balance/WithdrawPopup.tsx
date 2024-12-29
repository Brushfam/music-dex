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
  let tokenArr = [
    ...tokenOptions,
    {
      value: "INVESTMENT",
      label: "Investment",
      image: "/profile/balance/usd.png",
      contractAddress:
        "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
    },
  ];
  const { setTopUpStep, balanceList, investBalance } = useBalanceStore();
  const [token, setToken] = useState(tokenArr[0]);
  let amountToken =
    token.value === "INVESTMENT"
      ? investBalance?.balance || 0
      : balanceList.find((item) => item.currency.symbol === token.value)
          ?.balance || 0;
  const [address, setAddres] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [error, setError] = useState<null | string>(null);
  const [load, setLoad] = useState(false);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!address.trim()) {
      setError("address");
      return toast.error(t("inputError"));
    }
    if (!String(amount).trim()) {
      setError("amount");
      return toast.error(t("inputError"));
    }
    if (+amount <= 0) {
      setError("amount");
      toast.error(t("enter_amount"));
      return;
    }

    setLoad(true);

    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const userToken = await user.getIdToken();
        withdrwFetch(userToken, {
          amount: String(amount),
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
        <div className="title">
          <h2>{t("send")}</h2>

          <p onClick={() => setTopUpStep(null)}>
            <img src="/icons/close.svg" alt="close" />
          </p>
        </div>

        <div className={"currencyContainer"}>
          <form onSubmit={handleSubmit}>
            <div className="containerItem">
              <h4>{t("currency")}</h4>

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
                options={tokenArr as any}
                className="select"
              />
            </div>
            <div className="containerItem">
              <h4>{t("withdrawAmount")}</h4>
              <input
                onChange={(e) => {
                  if (/^\d*\.?\d*$/.test(e.target.value)) {
                    let inputValue = e.target.value.trim();
                    if (inputValue === "") {
                      setAmount(0);
                      return;
                    }
                    if (inputValue.indexOf(".") > 0) {
                      setAmount(inputValue);
                      return;
                    }
                    if (inputValue.startsWith("0")) {
                      inputValue = inputValue.slice(1);
                    }
                    setAmount(inputValue);

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
                {(+amountToken).toFixed(2)}{" "}
                {token.value === "INVESTMENT" ? "$" : token.value}
              </p>
            </div>
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
            <p className="infoText">{t(token.value)}</p>

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
