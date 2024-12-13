import { BalanceType } from "@/types/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import s from "./Balance.module.scss";

export const BalanceTable = ({
  balanceList,
}: {
  balanceList: BalanceType[];
}) => {
  const t = useTranslations("ProfileInvestor.Balance");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [sortedData, setSortedData] = useState<any[]>([]);
  console.log(balanceList);
  useEffect(() => {
    const sorted = [...balanceList].sort((a, b) => {
      if (sortOrder === "asc") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else {
        return parseFloat(b.price) - parseFloat(a.price);
      }
    });
    setSortedData(sorted);
  }, [sortOrder, balanceList]);

  const calculateUsdValue = (balance: string, price: string) => {
    return (parseFloat(balance) * parseFloat(price)).toFixed(5);
  };
  return (
    sortedData.length > 0 && (
      <div className={s.balanceSection}>
        <div className="line"></div>
        <div className={s.tableFlexContainer}>
          <div className={s.tableContainer}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>{t("token")}</th>
                  <th>{t("price")}</th>
                  <th>{t("amount")}</th>
                  <th>{t("value")}</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <Image
                        src={`/profile/balance/${row.currency.symbol.toLowerCase()}.png`}
                        alt={`${row.currency.symbol} Icon`}
                        className={s.icon}
                        width={25}
                        height={25}
                      />
                      {row.currency.symbol}
                    </td>
                    <td className={s.price}>{row.price}</td>
                    <td>{row.balance}</td>
                    <td className={s.usdValue}>
                      {calculateUsdValue(row.balance, row.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.sortContainer}>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <Image
                src={"/profile/balance/sort-icon.svg"}
                alt="Sort Icon"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    )
  );
};
