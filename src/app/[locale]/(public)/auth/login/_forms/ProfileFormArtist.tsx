"use client";

import { Button } from "@/components/ui/Button/Button";
import { countries } from "@/data/countries";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { updateArtistInfo } from "@/services/users/artist/artist";
import { setFirstLogin } from "@/services/users/users";
import { useUserStore } from "@/store/user";
import { ArtistInfo } from "@/types/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { toast } from "sonner";
import s from "../../Auth.module.scss";

export default function ProfileFormArtist(props: { currentLocale: string }) {
  const t = useTranslations("Auth.ProfileForm");
  const router = useRouter();
  const setCurrentUserName = useUserStore((state) => state.setCurrentUserName);
  const [formData, setFormData] = useState<ArtistInfo>({
    firstName: "",
    lastName: "",
    artistName: "",
    country: "",
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
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
        setFirstLogin(token).catch((error) => {
          console.log(error);
        });
        updateArtistInfo(token, updatedData)
          .then(() => {
            setCurrentUserName(formData.firstName);
            router.replace("/" + props.currentLocale + "/profile");
          })
          .catch((error) => {
            console.log(error);
            toast.error(t("other_errors"));
          });
      }
    });
  };

  const handleSkip = () => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setFirstLogin(token).catch((error) => {
          console.log(error);
        });
      }
    });
    router.replace("/" + props.currentLocale + "/profile");
  };

  function AdditionalInfo() {
    return <div style={{ display: "flex", flexDirection: "column" }}></div>;
  }

  return (
    <div className={s.block}>
      <p className={s.title} style={{ marginBottom: 24 }}>
        {t("title")}
      </p>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <label>{t("name")}</label>
        <input
          type="text"
          name="firstName"
          placeholder={t("name_placeholder")}
          value={formData.firstName}
          onChange={handleChange}
          className={s.formInput}
          style={{ margin: "4px 0 10px 0" }}
          required
        />
        <label>{t("last_name")}</label>
        <input
          type="text"
          name="lastName"
          placeholder={t("last_name_placeholder")}
          value={formData.lastName}
          onChange={handleChange}
          className={s.formInput}
          style={{ margin: "4px 0 10px 0" }}
          required
        />
        <label>{t("artist_name")}</label>
        <input
          type="text"
          name="artistName"
          placeholder={t("artist_name_placeholder")}
          value={formData.artistName}
          onChange={handleChange}
          className={s.formInput}
          style={{ margin: "4px 0 10px 0" }}
          required
        />
        {/*<AdditionalInfo />*/}
        <label>{t("country")}</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={s.formInput}
          style={{ margin: "4px 0 10px 0" }}
          required
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 12,
            marginTop: 12,
          }}
        >
          <Button
            title={t("skip")}
            color={"transparent"}
            arrow={false}
            type="button"
            action={handleSkip}
          />
          <Button
            title={loading ? t("saving") : t("save")}
            color={loading ? "loading" : "main"}
            type="submit"
            arrow={false}
          />
        </div>
      </form>
    </div>
  );
}
