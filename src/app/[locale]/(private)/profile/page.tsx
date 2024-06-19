"use client";
import {useRouter} from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const router = useRouter();

  // useEffect(() => {
  //   if (!localStorage.getItem("fb-jwt-token")) {
  //     router.replace("/en/auth/login");
  //   } else {
  //     router.replace("/profile/overview")
  //   }
  // }, [router]);

  return <div></div>;
}
