import s from "./Tab.module.scss";

export function Tab(props: { text: string }) {
  return <div className={s.tab}>{props.text}</div>;
}
