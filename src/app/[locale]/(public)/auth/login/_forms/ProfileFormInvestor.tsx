"use client";

import s from "../../Auth.module.scss";
import { useTranslations } from "next-intl";
import React, { ChangeEvent, useState } from "react";
import { useUserStore } from "@/store/user";
import { countries } from "@/data/countries";
import { Button } from "@/components/ui/Button/Button";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { updateInvestorInfo } from "@/services/users/investors/investors";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setFirstLogin } from "@/services/users/users";

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
          favGenre: formData.favGenre,
          country: formData.country,
          profiles: [formData.tiktok, formData.instagram, formData.twitter],
        };
        setFirstLogin(token).catch((error) => {
          console.log(error);
        });
        updateInvestorInfo(token, updatedData)
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
          <option value="blues">Blues</option>
          <option value="country">Country</option>
          <option value="reggae">Reggae</option>
          <option value="jazz">Jazz</option>
          <option value="classical">Classical</option>
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
      <div style={{ width: "100%" }}>
        <label>{t("name")}</label>
        <input
          type="text"
          name="firstName"
          placeholder={t("name_placeholder")}
          value={formData.firstName}
          onChange={handleChange}
          className={s.formInput}
          style={{ margin: "4px 0 10px 0" }}
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
        />
        <AdditionalInfo />
        <label>{t("social_media")}</label>
        <input
          type="text"
          name="tiktok"
          placeholder="tiktok.com/@username"
          value={formData.tiktok}
          onChange={handleChange}
          className={s.formInput}
          style={{ margin: "4px 0 10px 0" }}
        />
        <input
          type="text"
          name="instagram"
          placeholder="instagram.com/@username"
          value={formData.instagram}
          onChange={handleChange}
          className={s.formInput}
          style={{ margin: "4px 0 10px 0" }}
        />
        <input
          type="text"
          name="twitter"
          placeholder="twitter.com/@username"
          value={formData.twitter}
          onChange={handleChange}
          className={s.formInput}
          style={{ margin: "4px 0 10px 0" }}
        />
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
            action={handleSkip}
          />
          <Button
            title={loading ? t("saving") : t("save")}
            color={loading ? "loading" : "main"}
            arrow={false}
            action={loading ? () => {} : handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
