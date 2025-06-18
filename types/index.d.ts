import type { Currency } from './currency'

export {}

declare global {

  type CurrencyPair = `${Currency}-${Currency}`

  type CurrencyRates = Record<CurrencyPair, number>

  type StatisticsData = {
    value: String
    text: String
  }
}
