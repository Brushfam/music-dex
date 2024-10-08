import { Button } from "@/components/ui/Button/Button";
import { countries } from "@/data/countries";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { updateArtistInfo } from "@/services/users/artist/artist";
import { useUserStore } from "@/store/user";
import { ArtistInfo } from "@/types/types";
import { useTranslations } from "next-intl";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import s from "./Info.module.scss";

export function InfoForm(props: {
  artist: ArtistInfo;
  setTriggerFormRefresh: Dispatch<SetStateAction<number>>;
}) {
  const t = useTranslations("ProfileArtist.Profile");
  const userEmail = useUserStore((state) => state.currentUserEmail);
  const [formData, setFormData] = useState({
    firstName: props.artist.firstName || "",
    lastName: props.artist.lastName || "",
    artistName: props.artist.artistName || "",
    country: props.artist.country || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
            toast.success(t("updated"));
          })
          .catch((error) => {
            console.log(error);
            toast.error(t("another_error"));
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
          <label>{t("name")}</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={s.formInput}
          />
        </div>
        <div className={s.inputBlock}>
          <label>{t("email")}</label>
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
          <label>{t("last_name")}</label>
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
        style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}
      >
        <p className={s.inputRowTitle}>{t("additional_info")}</p>
        <div className={s.inputRow}>
          <div className={s.inputBlock}>
            <label>{t("artist_name")}</label>
            <input
              type="text"
              name="artistName"
              value={formData.artistName}
              onChange={handleChange}
              className={s.formInput}
            />
          </div>
          <div className={s.inputBlock}>
            <label>{t("country")}</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={s.formInput}
            >
              <option value="">{t("select_country")}</option>
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
      <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
        <Button
          title={t("cancel")}
          color={"transparent"}
          arrow={false}
          action={handleCancel}
        />
        <Button
          title={loading ? t("saving") : t("save")}
          color={loading ? "loading" : "main"}
          arrow={false}
          action={loading ? () => {} : handleSubmit}
        />
      </div>
    </div>
  );
}
