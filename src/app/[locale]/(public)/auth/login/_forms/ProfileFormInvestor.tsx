"use client";

import { Button } from "@/components/ui/Button/Button";
import { countries } from "@/data/countries";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { setFirstLogin, updateUserInfo } from "@/services/users/users";
import { useUserStore } from "@/store/user";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { toast } from "sonner";
import s from "../../Auth.module.scss";

export default function ProfileFormInvestor(props: { currentLocale: string }) {
  const t = useTranslations("Auth.ProfileForm");
  const router = useRouter();
  const setCurrentUserName = useUserStore((state) => state.setCurrentUserName);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    favGenre: "",
    country: "",
    tiktok: "",
    instagram: "",
    twitter: "",
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
    if (loading) {
      return;
    }
    setLoading(true);
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const updatedData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          favGenre: formData.favGenre,
          country: formData.country,
          phone: formData.country,
          profiles: [formData.tiktok, formData.instagram, formData.twitter],
        };
        setFirstLogin(token).catch((error) => {
          console.log(error);
        });
        updateUserInfo(token, updatedData)
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
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>{t("genre")}</label>
        <select
          name="favGenre"
          value={formData.favGenre}
          onChange={handleChange}
          className={s.formInput}
          style={{ margin: "4px 0 10px 0" }}
        >
          <option value="">{t("select_genre")}</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="hiphop">Hip Hop</option>
          <option value="electronic">Electronic</option>
          <option value="techno">Techno</option>
          <option value="blues">Blues</option>
          <option value="country">Country</option>
          <option value="reggae">Reggae</option>
          <option value="jazz">Jazz</option>
          <option value="classical">Classical</option>
          <option value="indie">Indie rock</option>
          <option value="metal">Metal</option>
        </select>
        <label>{t("country")}</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={s.formInput}
          style={{ margin: "4px 0 10px 0" }}
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
    );
  }

  return (
    <div className={s.block}>
      <p className={s.title} style={{ marginBottom: 24 }}>
        {t("title")}
      </p>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
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

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 12,
          }}
        >
          <Button
            title={loading ? t("saving") : t("save")}
            color={loading ? "loading" : "main"}
            arrow={false}
            type="submit"
            // action={loading ? () => {} : handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}
