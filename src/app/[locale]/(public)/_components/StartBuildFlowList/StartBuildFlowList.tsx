"use client";
import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import { useLocale } from "use-intl";
import s from "./StartBuildFlowList.module.scss";

export function StartBuildFlowList(props: {
  dataEN: { img: string; text: string; description: string }[];
  dataUK: { img: string; text: string; description: string }[];
  symbol: string;
}) {
  const locale = useLocale();
  const flowList = locale === "uk" ? props.dataUK : props.dataEN;
  const t = useTranslations("Home");

  return (
    <div className={s.list}>
      <div className={s.list_desktop}>
        {flowList.map((data, index) => {
          return (
            <div key={index}>
              <div className={s.list_item}>
                <div className={s.list_imageBlock}>
                  <Image
                    src={data?.img}
                    alt={data.text}
                    width={30}
                    height={30}
                  />
                </div>
                <div>
                  <p className={s.list_title}>{data.text}</p>
                  <p className={s.list_description}>{data.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <StartBuildFlowListSlider {...props} />

      <div className={s.btnGroup}>
        <Button
          title={t("start_building_btn1")}
          color={"main"}
          arrow={false}
          path={`${locale}/auth/signup`}
        />
        <Button
          title={t("start_building_btn2")}
          color={"transparent"}
          arrow={true}
          path={`${locale}/songs`}
        />
      </div>
    </div>
  );
}

export function StartBuildFlowListSlider(props: {
  dataEN: { img: string; text: string; description: string }[];
  dataUK: { img: string; text: string; description: string }[];
  symbol: string;
}) {
  const locale = useLocale();
  const flowList = locale === "uk" ? props.dataUK : props.dataEN;

  const settings: Settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={s.list_mobile}>
      <Slider {...settings}>
        {flowList.map((data, index) => {
          return (
            <div key={index}>
              <div className={s.list_mobile_item}>
                <div className={s.list_mobile_imageBlock}>
                  <Image
                    src={data?.img}
                    alt={data.text}
                    width={30}
                    height={30}
                  />
                </div>
                <div className={s.list_mobile_text_block}>
                  <p className={s.list_mobile_title}>{data.text}</p>
                  <p className={s.list_mobile_description}>
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
