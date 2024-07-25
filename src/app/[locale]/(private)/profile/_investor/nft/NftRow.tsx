import s from "./NFTs.module.scss";

export function NftRow(props: {
  date: string;
  item_link: string;
  item_full_link: string;
  name: string;
  amount: number;
  description: string;
}) {
  return (
    <div className={s.nftRow}>
      <p className={s.nftRow_date}>{props.date}</p>
      <a href={props.item_full_link} target={"_blank"} className={s.nftRow_item}>
        <img src={props.item_link} alt={"NFT"} width={100} height={100} />
      </a>
      <p className={s.nftRow_name}>{props.name}</p>
      <p className={s.nftRow_amount}>{props.amount}</p>
      <p className={s.nftRow_description}>{props.description}</p>
    </div>
  );
}
