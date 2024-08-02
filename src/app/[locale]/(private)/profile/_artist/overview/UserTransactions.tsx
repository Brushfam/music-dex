import s from "./Overview.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArtistPurchaseHistory } from "@/types/types";

export function UserTransactions(props: { history: ArtistPurchaseHistory[] }) {
  const t = useTranslations("ProfileArtist.Overview");

  function TransactionRow(props: {
    date: string;
    song: string;
    tokens: number;
    invested: number;
  }) {
    return (
      <div className={s.transactionsRow}>
        <p className={s.transactionsRow_date}>{props.date}</p>
        <p className={s.transactionsRow_song}>{props.song}</p>
        <p className={s.transactionsRow_tokens}>{props.tokens}</p>
        <p className={s.transactionsRow_invested}>${props.invested}</p>
      </div>
    );
  }

  return props.history.length ? (
    <div className={s.transactionsBlock}>
      <p className={s.title}>{t("transactions_title")}</p>
      <div className={s.transactionsHeader}>
        <p className={s.transactionsHeader_date}>{t("date_time")}</p>
        <p className={s.transactionsHeader_song}>{t("song")}</p>
        <p className={s.transactionsHeader_tokens}>{t("tokens")}</p>
        <p className={s.transactionsHeader_invested}>{t("amount")}</p>
      </div>
      <div className={s.transactionsBlockList}>
        {props.history.map((row, i) => {
          return (
            <TransactionRow
              key={i.toString()}
              date={row.date}
              song={row.name}
              tokens={row.amount}
              invested={row.invested}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div className={s.transactionsBlock}>
      <p className={s.title}>{t("transactions_title")}</p>
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
          src={"/profile/empty-list/statistics.svg"}
          alt={"icon"}
          width={50}
          height={50}
        />
        <p className={s.transactionsBlock_text1}>
          {t("empty_transactions_list")}
        </p>
      </div>
    </div>
  );
}
