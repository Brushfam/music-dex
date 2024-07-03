import s from "./Info.module.scss";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {ArtistInfo} from "@/types/types";
import { countries } from "@/data/countries";
import { Button } from "@/components/ui/Button/Button";
import { useUserStore } from "@/store/user";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { toast } from "sonner";
import {updateArtistInfo} from "@/services/users/artist/artist";

export function InfoForm(props: {
}) {
  const userEmail = "kalush@music.com"
  const [formData, setFormData] = useState({
    firstName: "Oleg",
    lastName: "Psyuk",
    artistName: "Kalush",
    country: "Ukraine",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={s.inputRow}>
        <div className={s.inputBlock}>
          <label>Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={s.formInput}
          />
        </div>
        <div className={s.inputBlock}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userEmail}
            disabled
            className={s.formInput}
            style={{ color: "grey" }}
          />
        </div>
      </div>
      <div className={s.inputRow}>
        <div className={s.inputBlock}>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={s.formInput}
          />
        </div>
      </div>
      <div
          style={{display: "flex", flexDirection: "column", marginBottom: 16}}
      >
        <p className={s.inputRowTitle}>Additional Info</p>
        <div className={s.inputRow}>
          <div className={s.inputBlock}>
            <label>Artist Name</label>
            <input
                type="text"
                name="artistName"
                value={formData.artistName}
                onChange={handleChange}
                className={s.formInput}
            />
          </div>
          <div className={s.inputBlock}>
            <label>Country</label>
            <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={s.formInput}
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => {
                return (
                    <option key={index.toString()} value={country.name}>
                      {country.name}
                    </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div style={{display: "flex", flexDirection: "row", gap: 12}}>
        <Button
            title={"Cancel"}
            color={"transparent"}
            arrow={false}
        />
        <Button
            title={"Save Changes"}
            color={"main"}
            arrow={false}
        />
      </div>
    </div>
  );
}
