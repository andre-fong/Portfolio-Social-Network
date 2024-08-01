export type StockHoldings = {
  symbol: string;
  shares: number;
  price: number;
  totalValue: number;
  change: number;
  totalChange: number;
};

export type StockData = {
  symbol: string;
  /**
   * Most recent close price
   */
  price: string;
  change: string;
  changePercent: string;
};

export type StockDaysData = {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type LogType = "transaction" | "transfer" | "trade";
export type TransactionType = "deposit" | "withdraw";
export type TradeType = "buy" | "sell";
