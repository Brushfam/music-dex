"use client"
import s from "./FlowList.module.scss";
import { flowListDataEN, flowListDataUK } from "@/data/homepage/flowListData";
import { GreyBlock } from "@/components/ui/GreyBlock/GreyBlock";
import {useLocale} from "use-intl";

export function FlowList() {
  const locale = useLocale();
  const flowList = locale === "uk" ? flowListDataUK : flowListDataEN

  return (
    <div className={s.list}>
      {flowList.map((data, index) => {
        return (
          <GreyBlock key={index}>
            <div className={s.list_item}>
              <div className={s.list_numberBlock}>
                <p>0{index + 1}</p>
              </div>
              <p className={s.list_description}>{data.text}</p>
            </div>
          </GreyBlock>
        );
      })}
    </div>
  );
}
