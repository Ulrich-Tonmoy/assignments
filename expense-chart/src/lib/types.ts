export enum Period {
  M1 = "1M",
  M6 = "6M",
  Y1 = "1Y",
  ALL_TIME = "ALL TIME",
}

export type ChartData = {
  period: string;
  personal: number;
  shopping: number;
  phone: number;
  other: number;
};
