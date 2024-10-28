"use client";
import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
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
      {flowList.map((data, index) => {
        return (
          <div key={index}>
            <div className={s.list_item}>
              <div className={s.list_imageBlock}>
                <Image src={data?.img} alt={data.text} width={30} height={30} />
              </div>
              <div>
                <p className={s.list_title}>{data.text}</p>
                <p className={s.list_description}>{data.description}</p>
              </div>
            </div>
          </div>
        );
      })}
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
