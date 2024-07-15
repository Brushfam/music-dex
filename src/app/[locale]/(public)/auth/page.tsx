"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Auth() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/auth/login");
  }, [router]);

  return null;
}
