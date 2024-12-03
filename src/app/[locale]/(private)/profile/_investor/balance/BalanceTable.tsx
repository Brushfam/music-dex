import Image from "next/image";
import s from "./Balance.module.scss";

export const BalanceTable = () => {
  const data = [
    {
      token: "ETH",
      price: "$2,456.02",
      amount: "0.0032456",
      usdValue: "$7.0895",
    },
    {
      token: "ETH",
      price: "$2,456.02",
      amount: "0.0032456",
      usdValue: "$7.0895",
    },
    {
      token: "ETH",
      price: "$2,456.02",
      amount: "0.0032456",
      usdValue: "$7.0895",
    },
    {
      token: "ETH",
      price: "$2,456.02",
      amount: "0.0032456",
      usdValue: "$7.0895",
    },
    {
      token: "ETH",
      price: "$2,456.02",
      amount: "0.0032456",
      usdValue: "$7.0895",
    },
    {
      token: "ETH",
      price: "$2,456.02",
      amount: "0.0032456",
      usdValue: "$7.0895",
    },
  ];
  return (
    <div className={s.balanceSection}>
      <div className="line"></div>
      <div className={s.tableFlexContainer}>
        <div className={s.tableContainer}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Token</th>
                <th>Price</th>
                <th>Amount</th>
                <th>USD Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Image
                      src="/profile/balance/eth.png"
                      alt="ETH Icon"
                      className={s.icon}
                      width={25}
                      height={25}
                    />
                    {row.token}
                  </td>
                  <td className={s.price}>{row.price}</td>
                  <td>{row.amount}</td>
                  <td className={s.usdValue}>{row.usdValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={s.sortContainer}>
          <button>
            <Image
              src={"/profile/balance/sort-icon.svg"}
              alt=""
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
