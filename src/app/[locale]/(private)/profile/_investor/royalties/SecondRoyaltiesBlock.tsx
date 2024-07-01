import s from "./Royalties.module.scss";
import Image from "next/image";

export function SecondRoyaltiesBlock() {
  return (
    <div className={s.secondBlockRow}>
      <div className={s.secondBlock}>
        <p className={s.title}>Payment History</p>
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
            style={{marginBottom: 4}}
          />
          <p className={s.text1}>
            Your payment history will be listed here
          </p>
          <p className={s.text2}>Choose a song to invest</p>
        </div>
      </div>
      <div className={s.secondBlock}>
        <p className={s.title}>Future payouts</p>
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
            src={"/profile/empty-list/future-payouts.svg"}
            alt={"icon"}
            width={38}
            height={48}
          />
          <p className={s.text1}>
            Your future payouts will be listed here
          </p>
          <p className={s.text2}>
            Choose a song from the catalog to invest and receive income
          </p>
        </div>
      </div>
    </div>
  );
}
