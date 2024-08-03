export type Stock = {
  tickerSymbol: string;
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type StockMatrixType = "covariance" | "correlation";

export type StockMatrix = {
  symbols: string[];
  covariance: number[][];
  correlation: number[][];
};
