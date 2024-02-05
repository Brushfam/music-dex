import s from "./FlowList.module.scss";
import { flowListData } from "@/data/flowListData";
import { Block } from "@/components/ui/Block/Block";

export function FlowList() {
  return (
    <div className={s.list}>
      {flowListData.map((data, index) => {
        return (
          <Block key={index}>
            <div className={s.list_item}>
              <div className={s.list_numberBlock}>
                <p>0{index + 1}</p>
              </div>
              <p style={{ fontSize: 14 }}>{data.text}</p>
            </div>
          </Block>
        );
      })}
    </div>
  );
}
