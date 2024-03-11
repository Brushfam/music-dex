"use client"
import s from "./FlowList.module.scss";
import { GreyBlock } from "@/components/ui/GreyBlock/GreyBlock";
import {useLocale} from "use-intl";

export function FlowList(props: {dataEN: {text: string}[], dataUK: {text: string}[], symbol: string}) {
  const locale = useLocale();
  const flowList = locale === "uk" ? props.dataUK : props.dataEN

  return (
    <div className={s.list}>
      {flowList.map((data, index) => {
        return (
          <GreyBlock key={index}>
            <div className={s.list_item}>
              <div className={s.list_numberBlock}>
                <p>{props.symbol}{index + 1}</p>
              </div>
              <p className={s.list_description}>{data.text}</p>
            </div>
          </GreyBlock>
        );
      })}
    </div>
  );
}
