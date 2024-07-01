import s from "./Overview.module.scss";
import { UserTransactions } from "@/app/[locale]/(private)/profile/_artist/overview/UserTransactions";
import { PaymentHistory } from "@/app/[locale]/(private)/profile/_artist/overview/PaymentHistory";

export function SecondBlock() {
  return (
    <div className={s.secondOverviewRow}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
        }}
      >
        <UserTransactions />
        <PaymentHistory />
      </div>
    </div>
  );
}
