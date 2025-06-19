import type { Currency } from "./currency";

export {};

declare global {
  type CurrencyPair = `${Currency}-${Currency}`;

  type CurrencyRates = Record<CurrencyPair, number>;

  type StatisticsData = {
    value: String;
    text: String;
  };

  type DropdownOption = {
    name: string;
    value: string | number;
  };

  type HeaderLink = {
    name: string;
    link?: string;
    action?: string;
    enabled: boolean;
    custom?: boolean;
  };
}
