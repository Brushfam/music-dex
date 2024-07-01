import s from "./Info.module.scss";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { InvestorInfo } from "@/types/types";
import { countries } from "@/data/countries";
import { Button } from "@/components/ui/Button/Button";
import { useUserStore } from "@/store/user";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { updateInvestorInfo } from "@/services/users/investors/investors";
import { toast } from "sonner";

export function InfoForm(props: {
  investor: InvestorInfo;
  setTriggerFormRefresh: Dispatch<SetStateAction<number>>;
}) {
  const setCurrentUserName = useUserStore(
      (state) => state.setCurrentUserName,
  );
  const userEmail = useUserStore((state) => state.currentUserEmail);
  const [formData, setFormData] = useState({
    firstName: props.investor.firstName || "",
    lastName: props.investor.lastName || "",
    favGenre: props.investor.favGenre || "",
    country: props.investor.country || "",
    tiktok: props.investor.profiles[0] || "",
    instagram: props.investor.profiles[1] || "",
    twitter: props.investor.profiles[2] || "",
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
        updateInvestorInfo(token, updatedData)
          .then(() => {
            setCurrentUserName(formData.firstName)
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

  function AdditionalInfo() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p className={s.inputRowTitle}>Additional Info</p>
        <div className={s.inputRow}>
          <div className={s.inputBlock}>
            <label>Favorite Music Genre</label>
            <select
              name="favGenre"
              value={formData.favGenre}
              onChange={handleChange}
              className={s.formInput}
            >
              <option value="">Select Genre</option>
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
    );
  }

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
      <AdditionalInfo />
      <div
        style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}
      >
        <p className={s.inputRowTitle}>Social Media</p>
        <div className={s.inputSocialRow}>
          <input
            type="text"
            name="tiktok"
            placeholder="tiktok.com/@username"
            value={formData.tiktok}
            onChange={handleChange}
            className={s.formSocialInput}
          />
          <input
            type="text"
            name="instagram"
            placeholder="instagram.com/@username"
            value={formData.instagram}
            onChange={handleChange}
            className={s.formSocialInput}
          />
          <input
            type="text"
            name="twitter"
            placeholder="twitter.com/@username"
            value={formData.twitter}
            onChange={handleChange}
            className={s.formSocialInput}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
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
          action={loading ? () => {} : handleSubmit}
        />
      </div>
    </div>
  );
}