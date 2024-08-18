"use client";
import { Footer } from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";

export function FooterController() {
  const pathname = usePathname();
  return pathname.includes("/auth") ? null : <Footer />;
}
