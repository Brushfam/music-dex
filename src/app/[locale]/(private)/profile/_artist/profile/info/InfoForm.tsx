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
  artist: ArtistInfo;
  setTriggerFormRefresh: Dispatch<SetStateAction<number>>;
}) {
  const userEmail = useUserStore((state) => state.currentUserEmail);
  const [formData, setFormData] = useState({
    firstName: props.artist.firstName || "",
    lastName: props.artist.lastName || "",
    artistName: props.artist.artistName || "",
    country: props.artist.country || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const updatedData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          artistName: formData.artistName,
          country: formData.country,
        };
        updateArtistInfo(token, updatedData)
          .then(() => {
            toast.success("updated");
          })
          .catch((error) => {
            console.log(error);
            toast.error("error");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  const handleCancel = () => {
    props.setTriggerFormRefresh((count) => count + 1);
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
            action={handleCancel}
        />
        <Button
            title={loading ? "Saving..." : "Save Changes"}
            color={loading ? "loading" : "main"}
            arrow={false}
            action={loading ? () => {
            } : handleSubmit}
        />
      </div>
    </div>
  );
}
