export type StockHoldings = {
  symbol: string;
  shares: number;
  price: number;
  totalValue: number;
  change: number;
  totalChange: number;
};

/**
 * Stock details for most recent day
 */
export type StockDetails = {
  symbol: string;
  /**
   * Most recent close price
   */
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
};

/**
 * Stock details over a period of time
 */
export type StockDaysData = {
  date: Date;
  close: number;
};

export type LogType = "transaction" | "transfer" | "trade";
export type TransactionType = "deposit" | "withdraw";
export type TradeType = "buy" | "sell";

export type DateRange = "1W" | "1M" | "3M" | "1Y" | "5Y";
