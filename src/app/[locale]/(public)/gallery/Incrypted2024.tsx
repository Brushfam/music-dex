"use client";

import Fancybox from "@/app/[locale]/(public)/gallery/Fancybox";
import * as React from "react";
import { FancyboxElement } from "@/app/[locale]/(public)/gallery/FancyboxElement";

export function Incrypted2024() {
  const length = 17;
  const numbersArray = Array.from(Array(length).keys()).map((i) => i + 1);

  return (
    <Fancybox
      options={{
        Carousel: {
          infinite: false,
        },
      }}
    >
      {numbersArray.map((v) => {
        return (
          <FancyboxElement key={v.toString()} event={"incrypted2024"} n={v} />
        );
      })}
    </Fancybox>
  );
}
