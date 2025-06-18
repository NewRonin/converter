import { defineStore } from "pinia";
import type { Currency } from "@/types/currency";

type IMainState = {
  protocol: String;
  host: String;
  port: String;
  rates: CurrencyRates;
  loading: Boolean;
  selectedCurrency: Currency;
};

export const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    protocol: process.env?.API_PROTOCOL || "",
    host: process.env?.API_HOST || "",
    port: process.env?.API_PORT || "",
    rates: {} as CurrencyRates,
    loading: true,
    selectedCurrency: 'usd'
  }),

  actions: {
    getApi(url: string): string {
      return this.protocol + "://" + this.host + ":" + url;
    },

    setCurrency(currency: Currency){
        this.selectedCurrency = currency
    },

    async getCurrency() {
      this.loading = true;
      try {
        const res = await $fetch<CurrencyRates>(this.getApi("/api/currency"), {
          method: "GET",
        });
        this.rates = res;
      } catch (err: any) {
        throw showError({
          statusCode: err?.statusCode ? err.statusCode : 502,
          message: "Ошибка получения курсов валют",
        });
      } finally {
        this.loading = false;
      }
    },
  },
});
