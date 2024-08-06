"use client";
import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import { useArtistFormStore } from "@/store/artistForm";

export function RecommendButton() {
  const t = useTranslations("Home");
  const changeStep = useArtistFormStore((state) => state.setArtistFormStep);

  return (
    <Button
      title={t("recommend_button")}
      color={"main"}
      arrow={false}
      action={() => {
        changeStep("2");
      }}
    />
  );
}
