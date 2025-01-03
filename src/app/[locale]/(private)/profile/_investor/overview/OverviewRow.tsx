"use client";

import { ISongData } from "@/types/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import s from "./Overview.module.scss";

export function OverviewRow(props: {
  totalEarnings: number;
  totalInvestedAmount: number;
  totalTokensAmount: number;
  songs: ISongData[];
}) {
  const t = useTranslations("ProfileInvestor.Overview");
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  return (
    <div className={s.overviewRow}>
      <div className={s.overviewSubRow}>
        <div className={s.overviewItem}>
          <div className={s.overviewItem_column}>
            <p className={s.overviewItem_text1}>{t("earned")}</p>
            <p className={s.overviewItem_text2}>${props.totalEarnings || 0}</p>
          </div>
          <Image
            src={"/profile/overview/earned.svg"}
            alt={"earned"}
            height={25}
            width={25}
          />
        </div>
        <div className={s.overviewItem}>
          <div className={s.overviewItem_column}>
            <p className={s.overviewItem_text1}>{t("total_songs")}</p>
            <p className={s.overviewItem_text2}>{props.songs.length || 0}</p>
          </div>
          <Image
            src={"/profile/overview/total-songs.svg"}
            alt={"songs"}
            height={25}
            width={20}
          />
        </div>
      </div>
      <div className={s.overviewSubRow}>
        <div className={s.overviewItem}>
          <div className={s.overviewItem_column}>
            <p className={s.overviewItem_text1}>{t("invested_amount")}</p>
            <p className={s.overviewItem_text2}>
              ${props.totalInvestedAmount || 0}
            </p>
          </div>
          <Image
            src={"/profile/overview/total-invested.svg"}
            alt={"invested"}
            height={23}
            width={27}
          />
        </div>
        <div
          className={s.overviewDropdownContainer}
          onClick={() => setIsDropDownOpen((prev) => !prev)}
        >
          <div
            className={s.overviewItem}
            style={{
              borderBottom: isDropDownOpen ? "none" : "",
              borderBottomLeftRadius: isDropDownOpen ? 0 : "",
              borderBottomRightRadius: isDropDownOpen ? 0 : "",
            }}
          >
            <div className={s.overviewItem_column}>
              <p className={s.overviewItem_text1}>{t("total_tokens")}</p>
              <p className={s.overviewItem_text2}>{props.totalTokensAmount}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Image
                src={"/profile/overview/arrow-down.svg"}
                alt={""}
                height={12}
                width={22}
                style={{
                  marginTop: 21,
                }}
              />
              <Image
                src={"/profile/overview/total-tokens.svg"}
                alt={"earned"}
                height={26}
                width={23}
                style={{ marginTop: "auto" }}
              />
            </div>
          </div>
          {isDropDownOpen && (
            <div className={s.overviewDropdownWrapper}>
              <svg
                viewBox="0 0 330 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 1.5H256L266.5 12L276 1.5H329.5"
                  stroke="url(#paint0_linear_165_628)"
                  stroke-width="2"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_165_628"
                    x1="1"
                    y1="0.999842"
                    x2="330"
                    y2="0.999804"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F56121" stop-opacity="0" />
                    <stop offset="0.799" stop-color="#F56121" />
                    <stop offset="1" stop-color="#F56121" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              <div className={s.overviewDropdown}>
                <div className={s.overviewDropdown_row}>
                  <h3 className={s.overviewDropdown_title}>
                    {t("total_tokens_dropdown.title")}
                  </h3>
                  <p className={s.overviewDropdown_total}>
                    {props.totalTokensAmount}
                  </p>
                </div>
                <div className={"line"}></div>
                <div className={s.overviewDropdown_songs}>
                  {props?.songs?.map((song, i) => {
                    return (
                      <div
                        key={i.toString()}
                        className={s.overviewDropdown_row}
                      >
                        <p className={s.overviewDropdown_songTitle}>
                          {song.name}
                        </p>
                        <p className={s.overviewDropdown_songToken}>
                          {t("total_tokens_dropdown.token", {
                            amount: song.tokens,
                          })}
                        </p>
                      </div>
                    );
                  })}
                  {/*<div className={s.overviewDropdown_row}>*/}
                  {/*  <p className={s.overviewDropdown_songTitle}>Song 1</p>*/}
                  {/*  <p className={s.overviewDropdown_songToken}>*/}
                  {/*    {t("total_tokens_dropdown.token", { amount: 5 })}*/}
                  {/*  </p>*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
