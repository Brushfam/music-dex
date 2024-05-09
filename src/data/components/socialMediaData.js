import Image from "next/image";

export const socialMediaData = [
  {
    name: "Telegram",
    link: "https://t.me/musicdexplatform",
    desktopImage: (
      <Image
        src={"/icons/social-media/telegram-desktop.svg"}
        alt={"telegram"}
        width={12}
        height={13}
      />
    ),
    mobileImage: (
      <Image
        src={"/icons/social-media/telegram-mobile.svg"}
        alt={"telegram"}
        width={38}
        height={32}
      />
    ),
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/musicdex.inc?igsh=YjIxb29yZ2JvODh4",
    desktopImage: (
      <Image
        src={"/icons/social-media/inst-desktop.svg"}
        alt={"instagram"}
        width={12}
        height={12}
      />
    ),
    mobileImage: (
      <Image
        src={"/icons/social-media/inst-mobile.svg"}
        alt={"instagram"}
        width={36}
        height={37}
      />
    ),
  },
  {
    name: "TikTok",
    link: "https://www.tiktok.com/@music.dex?_t=8kEn4aTNHqI",
    desktopImage: (
      <Image
        src={"/icons/social-media/tt-desktop.svg"}
        alt={"tiktok"}
        width={12}
        height={12}
      />
    ),
    mobileImage: (
      <Image
        src={"/icons/social-media/tt-mobile.svg"}
        alt={"tiktok"}
        width={34}
        height={37}
      />
    ),
  },
  {
    name: "Twitter",
    link: "https://twitter.com/MusicDex_inc",
    desktopImage: (
      <Image
        src={"/icons/social-media/twitter-desktop.svg"}
        alt={"twitter"}
        width={12}
        height={10}
      />
    ),
    mobileImage: (
      <Image
        src={"/icons/social-media/twitter-mobile.svg"}
        alt={"twitter"}
        width={34}
        height={31}
      />
    ),
  },
  {
    name: "YouTube",
    link: "https://www.youtube.com/channel/UC3V8OECeFM2Fizg28mGsNHQ",
    desktopImage: (
      <Image
        src={"/icons/social-media/youtube-desktop.svg"}
        alt={"youtube"}
        width={12}
        height={9}
      />
    ),
    mobileImage: (
      <Image
        src={"/icons/social-media/youtube-mobile.svg"}
        alt={"youtube"}
        width={40}
        height={29}
      />
    ),
  },
];
