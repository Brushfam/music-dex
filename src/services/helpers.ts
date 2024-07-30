// MATH FUNCTIONS
import { monthList } from "@/data/profile/months";

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

export function formatEmail(email: string) {
  if (email.length <= 14) {
    return email;
  }
  return `${email.slice(0, 6)}...${email.slice(-6)}`;
}

// CHARTS
export function getMonthName(month: string, currentLocale: string) {
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
