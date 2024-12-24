"use client";

import { teamListData } from "@/data/homepage/teamListData";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import s from "./TeamList.module.scss";

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
            objectPosition="top"
          />
        </div>
        <p className={s.teamCard_name}>{props.name}</p>
        <p className={s.teamCard_role}>{props.role}</p>
      </div>
    </div>
  );
}

export function TeamList() {
  return (
    <>
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
      <TeamListSlider />
    </>
  );
}

export function TeamListSlider() {
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className={s.teamList_mobile}>
      <Slider {...settings}>
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
      </Slider>
    </div>
  );
}
