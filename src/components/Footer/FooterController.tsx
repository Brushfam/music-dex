"use client";
import {usePathname} from "next/navigation";
import { Footer } from "@/components/Footer/Footer";

export function FooterController() {
  const pathname = usePathname();
  return pathname.includes("/auth") ? null : <Footer />;
}
