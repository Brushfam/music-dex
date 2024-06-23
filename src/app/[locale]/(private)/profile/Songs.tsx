import s from "@/app/[locale]/(private)/profile/Profile.module.scss";
import { SongsListBlock } from "@/app/[locale]/(private)/profile/_components/songs/SongsList";

export default function Songs() {
  return (
    <div className={s.subpageWrapper}>
      <p className={s.pageTitle}>Invested songs</p>
        <SongsListBlock />
    </div>
  );
}
