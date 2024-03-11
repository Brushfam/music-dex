"use client"
import s from "./Contacts.module.css";
import {contactsDataEN, contactsDataUK} from "@/data/documents/contactsData";
import {useLocale} from "use-intl";

export function Contacts() {
    const currentLocale = useLocale();
    let contacts = currentLocale === "uk" ? contactsDataUK : contactsDataEN

  return (
    <div className={s.contacts}>
      <p className={s.header}>{currentLocale == "uk" ? "Контакти" : "Contacts"}:</p>
      {contacts.map((data, index) => {
        return <p key={index.toString()} style={{fontSize: 14, lineHeight: "130%"}}>{data.text}</p>;
      })}
    </div>
  );
}
