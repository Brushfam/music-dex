import s from "./Overview.module.scss";
import Image from "next/image";

export function PaymentHistory() {
  return (
    <div className={s.statisticsBlock}>
      <p className={s.title}>Royalty payments</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={"/profile/empty-list/payment-history.svg"}
          alt={"icon"}
          width={38}
          height={48}
        />
        <p className={s.statisticsBlock_text1}>
          Royalty payment history will be listed here
        </p>
      </div>
    </div>
  );
}
