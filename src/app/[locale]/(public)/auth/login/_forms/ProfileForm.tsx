"use client";

import { useEffect, useState } from "react";
import { getUserRole } from "@/services/users/users";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { LoadingSpinner } from "@/app/[locale]/(private)/profile/_components/LoadingSpinner";
import { useRouter } from "next/navigation";
import ProfileFormInvestor from "@/app/[locale]/(public)/auth/login/_forms/ProfileFormInvestor";
import ProfileFormArtist from "@/app/[locale]/(public)/auth/login/_forms/ProfileFormArtist";
import { useLocale } from "use-intl";

export function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const router = useRouter();
  const currentLocale = useLocale();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        getUserRole(token)
          .then((res) => {
            setRole(res.data.role);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            router.replace("/" + currentLocale + "/profile");
          });
      }
    });
  }, [currentLocale, router]);

  function CurrentProfile() {
    return role === "investor" ? (
      <ProfileFormInvestor currentLocale={currentLocale} />
    ) : (
      <ProfileFormArtist currentLocale={currentLocale} />
    );
  }

  return loading ? <LoadingSpinner fullHeight={true} /> : <CurrentProfile />;
}
