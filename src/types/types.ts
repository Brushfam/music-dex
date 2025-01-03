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
  BALANCE,
}

export type InvestorInfo = {
  firstName: string;
  lastName: string;
  favGenre: string;
  country: string;
  phone: string;
  profiles: string[]; // tiktok, instagram, twitter
};

export type ArtistInfo = {
  firstName: string;
  lastName: string;
  artistName: string;
  country: string;
};

export type Wallet = {
  address: string;
  name: string;
};

export type NFT = {
  nft_name: string;
  nft_description: string;
  nft_description_uk: string;
  nft_link: string;
  nft_thumbnail_link: string;
  nft_transfer_date: string;
  nft_amount: number;
};

export type ArtistPurchaseHistory = {
  date: string;
  name: string;
  amount: number;
  invested: number;
};

export type ArtistSongsStatistics = {
  month: string;
  invested: number;
  amount: number;
};

export type ArtistSong = {
  listeningDate: string;
  songName: string;
  totalAmount: number;
  totalInvested: number;
  statistics: ArtistSongsStatistics[];
};

export interface ISongData {
  date: string;
  name: string;
  tokens: number;
  invested: number;
  slug: string;
  artist: string;
  last_purchase: string;
}

export interface IRoyaltyData {
  royalties_id: number;
  user_id: string;
  song_id: number;
  purchase_id: number;
  currency_id: number;
  amount: string;
  created_at: string;
  usdt_amount: string;
  song: {
    song_id: number;
    title: string;
    artist: string;
  };
  currency: {
    currency_id: number;
    name: string;
    symbol: string;
  };
}

export enum TRANSACTION_STATUS {
  WAITING = "waiting",
  SUCCESS = "success",
  ERROR = "failed",
}

export enum TRANSACTION_TYPE {
  WALLET = "wallet",
  WHITEPAY = "whitepay",
}

export interface ITransaction {
  transaction_id: number;
  investor_id: number;
  currency_id: number;
  amount: string;
  transaction_type: TRANSACTION_TYPE;
  status: TRANSACTION_STATUS;
  created_at: string;
  updated_at: string;
  order_url: string;
  currency: {
    currency_id: number;
    name: string;
    symbol: string;
  };
}

export interface IInvoice {
  purchase_id: number;
  song_id: number;
  investor_id: number;
  payment_status: string;
  tx_status: null;
  token_amount: string;
  token_price: string;
  purchase_timestamp: string;
  payment_method: null;
  order_url: null;
  user_id: string;
  currency: null;
  song: {
    song_id: number;
    title: string;
  };
}

export interface IBalance {
  id?: number;
  investor_id?: number;
  currency_id?: number;
  balance: string;
  created_at?: string;
  updated_at?: string;
  currency: {
    name: string;
    symbol: string;
    currency_id: number;
  };
  price?: string;
}

export type BalanceType = {
  transaction_id: number;
  investor_id: number;
  currency_id: number;
  transaction_type: "string";
  amount: string;
  status: string;
  from_address: string;
  to_address: string;
  transaction_hash: string;
  created_at: string;
  updated_at: string;
  order_url: string;
  currency: {
    name: string;
    symbol: string;
    currency_id: number;
  };
  balance?: string;
  price?: string;
};

export interface ICatalogData {
  country: string;
  cover: string;
  cover_to_top: boolean;
  genre: string;
  listening_date: string;
  price: string;
  release_date: string;
  rightsholder: string;
  slug: string;
  song_name: string;
  total_supply: number;
}
