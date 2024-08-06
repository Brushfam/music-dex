export type trackDataType = {
  name: string;
  rights_holder: string;
  price: number;
  donateLink: string;
  genre: string;
  details: { type: string; value: string }[];
  description: string;
  about_artist: string[];
};

export type streamingServices = {
  youtube: string;
  youtubeMusic: string;
  apple: string;
  spotify: string;
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

export type InvestorInfo = {
  firstName: string;
  lastName: string;
  favGenre: string;
  country: string;
  profiles: string[]; // tiktok, instagram, twitter
}

export type ArtistInfo = {
  firstName: string;
  lastName: string;
  artistName: string;
  country: string;
}

export type Wallet = {
  address: string;
  name: string;
}

export type NFT = {
  nft_name: string;
  nft_description: string;
  nft_description_uk: string;
  nft_link: string;
  nft_thumbnail_link: string;
  nft_transfer_date: string;
  nft_amount: number;
}

export type ArtistPurchaseHistory = {
  date: string;
  name: string;
  amount: number;
  invested: number;
}

export type ArtistSongsStatistics = {
  month: string;
  invested: number;
  amount: number;
}

export type ArtistSong = {
  listeningDate: string;
  songName: string;
  totalAmount: number;
  totalInvested: number;
  statistics: ArtistSongsStatistics[];
}
