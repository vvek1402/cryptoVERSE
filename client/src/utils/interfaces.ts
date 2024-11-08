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
  amount?: number;
}

export interface WalletState {
  coins: CryptoSelected[];
  totalQuantity: number;
  addCoin: (coin: CryptoSelected) => void;
  removeCoin: (id: string, quantity: number) => void;
  symbol: string;
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
