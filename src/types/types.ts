export type trackDataType = {
  rights_holder: string;
  price: number;
  details: { type: string; value: string }[];
  description?: string;
};

export type faqNavigationType = {
  title: string;
}[];

export type faqContentType = {
  question: string;
  answer: string;
}[];

export enum UserRoles {
  Investor = "investor",
  Artist = "artist",
}

export enum SignUpSteps {
  ChooseAccount,
  SignUp,
  EmailSent,
  EmailIsNotVerified,
}

export enum LoginSteps {
  Login,
  ResetPassword,
  EmailSent,
  ProfileForm, // Is used when user is verified and log in for the first time
}

export enum ProfilePages {
  Overview,
  Songs,
  Royalties,
  Activities,
  NFTs,
  Settings,
  FAQ,
}

export interface InvestorInfo {
  firstName: string;
  lastName: string;
  favGenre: string;
  country: string;
  profiles: string[]; // tiktok, instagram, twitter
}

export interface ArtistInfo {
  firstName: string;
  lastName: string;
  artistName: string;
  country: string;
}

export interface Wallet {
  address: string;
  name: string;
}

export interface NFT {
  nft_name: string;
  nft_description: string;
  nft_description_uk: string;
  nft_link: string;
  nft_thumbnail_link: string;
  nft_transfer_date: string;
  nft_amount: number;
}
