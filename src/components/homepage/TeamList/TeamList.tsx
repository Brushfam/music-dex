import s from './TeamList.module.scss'
import React from "react";

export function TeamList() {

    function Card(props: { path: string, name: string, role: string }) {
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
          <Card path={"/team/Artem.png"} name={"Artem"} role={"Co-Founder"}/>
          <Card path={"/team/Markian.png"} name={"Markian Ivanichok"} role={"Co-Founder"}/>
          <Card path={"/team/Alina.png"} name={"Alina Antropova"} role={"Growth Manager"}/>
          <Card path={"/team/Tony.png"} name={"Tony Tonite"} role={"Music expert"}/>
      </div>
    );
}
