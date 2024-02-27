import s from "./Contacts.module.css";
import { contactsData } from "@/data/documents/contactsData";

export function Contacts() {
  return (
    <div className={s.contacts}>
      <p className={s.header}>Контакти:</p>
      {contactsData.map((data, index) => {
        return <p key={index.toString()} style={{fontSize: 14, lineHeight: "130%"}}>{data.text}</p>;
      })}
    </div>
  );
}
