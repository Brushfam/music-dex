
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
  return walletList.map(item => {
    // @ts-ignore
    const [name, address] = item.match(/\(([^)]+)\)/)[1].split(',');
    return { address: address.trim(), name: name.trim() };
  });
}

export function formatEmail(email: string) {
  if (email.length <= 10) {
    return email;
  }
  return `${email.slice(0, 6)}...${email.slice(-4)}`;
}