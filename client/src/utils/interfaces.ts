export interface AuthState {
  isAuthenticated: boolean;
  doLogin: () => void;
  logout: () => void;
}

export interface CryptoData {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface CryptoStatData {
  title: string;
  value: string;
  diff: any;
}

export interface History {
  time: Date;
  priceUsd: string;
}

export interface Market {
  exchangeId: string;
  baseSymbol: string;
  quoteSymbol: string;
  priceUsd: string;
  volumeUsd24Hr: string;
  volumePercent: string;
}

export interface ExchangeData {
  id: string;
  rank: string;
  exchangeUrl: string;
  name: string;
  percentTotalVolume: string;
  tradingPairs: string;
  volumeUsd: string;
}

export interface CryptoSelected {
  name: string;
  symbol: string;
  priceUsd: string;
  id: string;
  quantity?: number;
}

export interface HoldingsState {
  coins: CryptoSelected[];
  totalQuantity: number;
  addCoin: (coin: CryptoSelected, totalValue : number) => void;
  removeCoin: (coin: CryptoSelected, quantity: number, totalValue : number) => void;
}

export interface TableData {
  head: string[];
  body: (string | number | unknown)[][];
}

export interface CommonTableProps {
  data: TableData;
}

export interface CoinIconProp
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export interface CryptoHistoryResponse {
  data: History[];
}

export interface WatchlistStore {
  watchlist: { coinId: string; coinName: string }[];
  fetchWatchlist: () => Promise<void>;
  addCoin: (coinId: string, coinName: string) => Promise<void>;
  removeCoin: (coinId: string) => Promise<void>;
  isInWatchlist: (cryptoId: string) => boolean;
}

export interface PriceData {
  [key: string]: string;
}

export interface CryptoStore {
  prices: PriceData;
  loading: boolean;
  connect: (assets: string[]) => void;
}

export interface PaymentLog {
  addedAmount: number;
  createdAt: string;
  userId: string;
}

export interface TokenPayload {
  exp: number;
}

export interface BalanceStore {
  balance: number;
  fetchBalance: () => Promise<void>;
  addBalance: (amount: number) => Promise<void>;
  withdrawBalance: (amount: number) => Promise<void>;
}

export interface OrdersLog {
  totalPrice: number;
  createdAt: string;
  orderType: string;
  coinName : string;
  quantity : number
}

export interface Form {
  setFieldError: (field: string, message: string) => void;
}

export interface ErrorResponse {
  response?: {
    status: number;
    data: {
      errors?: { path: string; msg: string }[];
      error?: string;
    };
  };
}