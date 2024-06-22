import s from "./Settings.module.scss";

export function SettingsTabs() {
  return (
    <div className={s.tabsList}>
      <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>Personal info</p>
      <p style={{ color: "rgb(246, 96, 31)", cursor: "pointer" }}>Wallets</p>
    </div>
  );
}
