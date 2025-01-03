import { MainBlock } from "@/app/[locale]/(public)/songs/[slug]/_components/MainBlock/MainBlock";
import { SubpagesBlock } from "@/app/[locale]/(public)/songs/[slug]/_components/SubpagesBlock/SubpagesBlock";
import cs from "@/app/commonStyles.module.scss";
import FaqSection from "@/components/Faq/FaqSection/FaqSection";
import { ApprovePurchaseModal } from "@/components/modals/ApprovePurchaseModal/ApprovePurchaseModal";
import { NoWalletsModal } from "@/components/modals/NoWalletsModal/NoWalletsModal";
import { PayAccountModal } from "@/components/modals/PayAccount/PayAccountModal";
import { getSongMainData } from "@/services/songs";

async function fetchMainSongData(slug: string) {
  try {
    const res = await getSongMainData(slug);
    return res.data.songMainData;
  } catch (error) {
    console.error("Error fetching catalog:", error);
    return null;
  }
}

export default async function PageTemplate({
  params,
}: {
  params: { slug: string };
}) {
  const songMainData = await fetchMainSongData(params.slug);
  return (
    <div className={cs.main}>
      <ApprovePurchaseModal />
      <NoWalletsModal />
      <PayAccountModal
        songToken={+songMainData.price || 1}
        songId={songMainData.song_id}
      />
      <MainBlock songData={songMainData} slug={params.slug} />
      <SubpagesBlock
        slug={params.slug}
        totalSupply={songMainData.total_supply}
        price={songMainData.price}
      />
      <FaqSection />
    </div>
  );
}
