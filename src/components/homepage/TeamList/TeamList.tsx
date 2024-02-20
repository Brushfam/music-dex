import s from "./TeamList.module.scss";
import React from "react";
import { teamListData } from "@/data/teamListData";

export function TeamList() {
  function Card(props: { path: string; name: string; role: string }) {
    return (
      <div className={s.cardWrapper}>
        <div className={s.teamCard}>
          <img src={props.path} alt={props.name} />
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
