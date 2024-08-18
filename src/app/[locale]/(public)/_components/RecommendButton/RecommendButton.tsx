"use client";
import { Button } from "@/components/ui/Button/Button";
import { useArtistFormStore } from "@/store/artistForm";
import { useTranslations } from "next-intl";

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
