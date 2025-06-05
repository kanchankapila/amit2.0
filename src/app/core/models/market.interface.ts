export interface GlobalMarketData {
  text1: string;  // Symbol
  text2: string;  // Name
  text3: number;  // Percentage change
  text4: string;  // Current value
  indices: IndexData[];
  topGainers: StockData[];
  topLosers: StockData[];
  mostActive: StockData[];
}

export interface ScreenerData {
  text1: string;  // Company name
  text2: string;  // Current price
  text3: string;  // Open price
  text4: number;  // Change percentage
  text5: string;  // 52-week high
  text6: string;  // 52-week low
  text11: string; // Volume in thousands
  stocks: StockData[];
  filters: {
    sector?: string;
    marketCap?: number;
    pe?: number;
  };
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  sector: string;
  industry: string;
  text1: string;   // Company name
  text2: number;   // Change percentage
  text3: string;   // Current price
  text4: string;   // Target high
  text5: string;   // Target low
  text6: string;   // Strong buy count
  text7: string;   // Sell count
  text8: string;   // Hold count
  text9: string;   // Company info
  text10: string;  // Risk score
  text11: string;  // Technical score
  text12: string;  // Analyst score
}

export interface ChartData {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

export interface MarketState {
  globalMarket: GlobalMarketData[];
  screener: ScreenerData[];
  sectors: {
    name: string;
    value: number;
    change: number;
  }[];
  selectedValue: string;
  chartData: ChartData;
}

export interface IndexData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  sector: string;
  industry: string;
  advances: number;
  declines: number;
  unchanged: number;
  totalVolume: number;
  lastUpdated: Date;
  timestamp: Date;
  components: StockData[];
}

export interface SectorData {
  name: string;
  change: number;
  marketCap: number;
  volume: number;
  topGainers: string[];
  topLosers: string[];
}

export interface ScreenerCriteria {
  priceRange?: {
    min: number;
    max: number;
  };
  marketCap?: {
    min: number;
    max: number;
  };
  volume?: {
    min: number;
    max: number;
  };
  peRatio?: {
    min: number;
    max: number;
  };
  sector?: string[];
  industry?: string[];
} 