import s from "./FlowList.module.scss";
import { Block } from "@/components/ui/Block/Block";

export function FlowList(props: {listData:  {text: string;}[], symbol: string }) {
  return (
    <div className={s.list}>
      {props.listData.map((data, index) => {
        return (
          <Block key={index}>
            <div className={s.list_item}>
              <div className={s.list_numberBlock}>
                <p>{props.symbol}{index + 1}</p>
              </div>
              <p className={s.list_description}>{data.text}</p>
            </div>
          </Block>
        );
      })}
    </div>
  );
}
