import { monthList } from "@/data/profile/months";

// MATH FUNCTIONS
export function roundToTwo(n: number) {
  return Math.round(n * 100) / 100;
}

// FORMATTING
export function formatBlockchainAddress(address: string): string {
  if (address.length <= 10) {
    return address; // Return the address as is if it's too short to be formatted
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function parseWalletListResponse(walletList: string[]) {
  return walletList.map((item) => {
    // @ts-ignore
    const [name, address] = item.match(/\(([^)]+)\)/)[1].split(",");
    return { address: address.trim(), name: name.trim() };
  });
}

// CHARTS
export function getMonthForStreamStatistics(
  month: string,
  currentLocale: string,
) {
  // return month name depends on {currentLocale}
  if (currentLocale === "en") {
    return month;
  } else {
    let ukName = "";
    monthList.forEach((row: { en: string; uk: string }) => {
      if (row.en === month) {
        ukName = row.uk;
      }
    });
    return ukName;
  }
}

export function getMonthForArtistSongs(date: string, currentLocale: string) {
  // date is in YYYY-MM format
  const [, month] = date.split("-");
  const index = parseInt(month, 10) - 1;
  return currentLocale === "en" ? monthList[index].en : monthList[index].uk;
}
