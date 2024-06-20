"use client";
import {useRouter} from "next/navigation";
import { useEffect } from "react";
import {Button} from "@/components/ui/Button/Button";

export default function Profile() {
  const router = useRouter();

  // useEffect(() => {
  //   if (!localStorage.getItem("fb-jwt-token")) {
  //     router.replace("/en/auth/login");
  //   } else {
  //     router.replace("/profile/overview")
  //   }
  // }, [router]);

  return <Button title={""} color={"main"} arrow={false} />;
}
