import { teamListData } from "@/data/homepage/teamListData";
import Image from "next/image";
import s from "./TeamList.module.scss";

export function TeamList() {
  function Card(props: { path: string; name: string; role: string }) {
    return (
      <div className={s.cardWrapper}>
        <div className={s.teamCard}>
          <div className={s.teamCard_img}>
            <Image
              src={props.path}
              alt={props.name}
              fill={true}
              objectFit="cover"
            />
          </div>
          <p className={s.teamCard_name}>{props.name}</p>
          <p className={s.teamCard_role}>{props.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={s.teamList}>
      {teamListData.map((data, index) => {
        return (
          <Card
            path={data.path}
            name={data.name}
            role={data.role}
            key={index.toString()}
          />
        );
      })}
    </div>
  );
}
