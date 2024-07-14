"use client";

import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/app/[locale]/(private)/profile/_components/LoadingSpinner";
import { InfoForm } from "@/app/[locale]/(private)/profile/_investor/profile/info/InfoForm";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { useRouter } from "next/navigation";
import { getInvestorInfo } from "@/services/users/investors/investors";
import { InvestorInfo } from "@/types/types";
import { toast } from "sonner";
import {useTranslations} from "next-intl";

export function Info() {
  const t = useTranslations("Profile.Toast")
  const router = useRouter();
  const [investorInfo, setInvestorInfo] = useState<null | InvestorInfo>(null);
  const [triggerFormRefresh, setTriggerFormRefresh] = useState(0);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        getInvestorInfo(token)
          .then((res) => {
            const i = res.data.info;
            setInvestorInfo({
              firstName: i.first_name,
              lastName: i.last_name,
              country: i.country,
              favGenre: i.fav_genre,
              profiles: i.profiles,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error(t("another_error"));
          });
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
    });
  }, [router, t, triggerFormRefresh]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {!investorInfo ? (
        <LoadingSpinner fullHeight={true} />
      ) : (
        <InfoForm
          key={triggerFormRefresh}
          investor={investorInfo}
          setTriggerFormRefresh={setTriggerFormRefresh}
        />
      )}
    </div>
  );
}
