"use client";
import { UseUser } from "@/context/UserContext";
import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";

export function RecommendButton() {
  const t = useTranslations("Home");
  const userContext = UseUser();

  return (
    <Button
      title={t("recommend_button")}
      color={"main"}
      arrow={false}
      action={() => {
        userContext.setArtistFormStep("1");
      }}
    />
  );
}
