"use client";

import { PageWrapper } from "@/app/[locale]/(private)/profile/PageWrapper";
import { NftHeader } from "@/app/[locale]/(private)/profile/_investor/nft/NftHeader";
import { NftRow } from "@/app/[locale]/(private)/profile/_investor/nft/NftRow";
import { NoNFTsBlock } from "@/app/[locale]/(private)/profile/_investor/nft/NoNFTsBlock";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { getNFTs } from "@/services/users/investors/investors";
import { NFT } from "@/types/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "use-intl";

export function NFTs() {
  const t = useTranslations("ProfileInvestor.NFTs");
  const currentLocale = useLocale();
  const isEN = currentLocale === "en";
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [nftList, setNftList] = useState<NFT[]>([]);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        getNFTs(token)
          .then((res) => {
            setNftList(res.data.nfts);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
    });
  }, [router]);

  function NftList() {
    return nftList.length ? (
      <div style={{ display: "flex", flexDirection: "column", minWidth: 720 }}>
        <NftHeader />
        {nftList.map((data, i) => {
          return (
            <NftRow
              key={i.toString()}
              date={data.nft_transfer_date || t("have_not_received")}
              item_link={data.nft_thumbnail_link}
              item_full_link={data.nft_link}
              name={data.nft_name}
              amount={data.nft_amount}
              description={
                isEN ? data.nft_description : data.nft_description_uk
              }
            />
          );
        })}
      </div>
    ) : (
      <NoNFTsBlock />
    );
  }

  return (
    <PageWrapper title={t("title")} height={"auto"} loading={loading}>
      <NftList />
    </PageWrapper>
  );
}
