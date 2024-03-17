import s from "./Spinner.module.scss";

export function Spinner(props: { size?: number }) {
  return (
    <div
      className={s.loader}
      style={props.size ? { width: props.size } : {}}
    ></div>
  );
}
