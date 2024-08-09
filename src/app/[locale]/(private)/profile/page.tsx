"use client";

import React, { useEffect, useState } from "react";
import { ProfilePages } from "@/types/types";
import s from "./Profile.module.scss";
import { Sidebar } from "@/app/[locale]/(private)/_components/Sidebar/Sidebar";
import { getUserRole } from "@/services/users/users";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { useRouter } from "next/navigation";
import { CurrentInvestorPage } from "@/app/[locale]/(private)/profile/CurrentInvestorPage";
import { CurrentArtistPage } from "@/app/[locale]/(private)/profile/CurrentArtistPage";
import { LoadingSpinner } from "@/app/[locale]/(private)/_components/LoadingSpinner";
import { MobileHeader } from "@/app/[locale]/(private)/_components/MobileHeader/MobileHeader";
import SideMenu from "@/app/[locale]/(private)/_components/MobileHeader/SideMenu";

export default function Profile() {
  const [currentPage, setCurrentPage] = useState(ProfilePages.Overview);
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        getUserRole(token)
          .then((res) => {
            setRole(res.data.role);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        router.replace("/en/auth/login");
      }
    });
  }, [router]);

  function CurrentProfile() {
    if (role === "investor") {
      return <CurrentInvestorPage currentPage={currentPage} />;
    } else if (role === "artist") {
      return <CurrentArtistPage currentPage={currentPage} />;
    } else {
      return <LoadingSpinner fullHeight={false} />;
    }
  }

  return (
    <div>
      <MobileHeader>
        <SideMenu
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          role={role}
        />
      </MobileHeader>
      <div className={s.profileLayout}>
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          role={role}
        />
        <CurrentProfile />
      </div>
    </div>
  );
}
