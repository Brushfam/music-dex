"use client";

import { LoadingSpinner } from "@/app/[locale]/(private)/_components/LoadingSpinner";
import { InfoForm } from "@/app/[locale]/(private)/profile/_artist/profile/info/InfoForm";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { getUserInfo } from "@/services/users/users";
import { ArtistInfo } from "@/types/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function Info() {
  const t = useTranslations("ProfileArtist.Profile");
  const router = useRouter();
  const [artistInfo, setArtistInfo] = useState<null | ArtistInfo>(null);
  const [triggerFormRefresh, setTriggerFormRefresh] = useState(0);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        getUserInfo(token)
          .then((res) => {
            const i = res.data.info;
            setArtistInfo({
              firstName: i.first_name,
              lastName: i.last_name,
              country: i.country,
              artistName: i.artist_name,
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
      {!artistInfo ? (
        <LoadingSpinner fullHeight={true} />
      ) : (
        <InfoForm
          key={triggerFormRefresh}
          artist={artistInfo}
          setTriggerFormRefresh={setTriggerFormRefresh}
        />
      )}
    </div>
  );
}
