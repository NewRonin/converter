export const currencyList = ['usd', 'rub', 'eur', 'brl', 'kzt', 'idr'] as const
export type Currency = typeof currencyList[number]