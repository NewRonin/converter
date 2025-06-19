<template>
  <div class="converter-container">
    <main>
      <div class="converter-controls-container">
        <div class="converter-field-container">
          <label class="converter-label">Из валюты</label>
          <select v-model="fromCurrency" class="converter-select">
            <option
              v-for="option in currencyOptions"
              :key="option.id"
              :value="option.id"
            >
              {{ option.name }}
            </option>
          </select>

          <InputMain
            v-model="fromAmount"
            type="number"
            placeholder="Введите сумму"
            :required="true"
            @input="onFromAmountChange"
            class="converter-input"
          />
        </div>

        <div class="converter-field-container">
          <label class="converter-label">В валюту</label>
          <select v-model="toCurrency" class="converter-select">
            <option
              v-for="option in currencyOptions"
              :key="option.id"
              :value="option.id"
            >
              {{ option.name }}
            </option>
          </select>

          <InputMain
            v-model="toAmount"
            type="number"
            placeholder="Результат"
            :required="true"
            @input="onToAmountChange"
            class="converter-input"
          />
        </div>
      </div>

      <Table
        v-if="!store.loading"
        :headers="headers"
        :rows="conversionRows"
        class="currency-table"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import Table from "@/components/common/Table.vue";

const store = useMainStore();
store.getCurrency();

const currencyList = ["usd", "rub", "eur", "brl", "kzt", "idr"] as const;
type Currency = typeof currencyList[number];

const currencyOptions = currencyList.map((c) => ({
  id: c,
  name: c.toUpperCase(),
}));

const fromCurrency = ref<Currency>("usd");
const toCurrency = ref<Currency>("rub");

const fromAmount = ref<string>("1");
const toAmount = ref<string>("0");

const headers = [
  { name: "Валюта", value: "currency" },
  { name: "Курс", value: "rate" },
];

const conversionRows = computed(() => {
  if (!store.rates) return [];

  return currencyList.map((cur) => {
    const pair: `${Currency}-${Currency}` = `${cur}-${toCurrency.value}`;
    const rate = store.rates[pair] ?? 0;
    return {
      currency: cur.toUpperCase(),
      rate: rate.toFixed(4),
    };
  });
});

function getRate(from: Currency, to: Currency): number {
  if (from === to) return 1;
  const pair1: `${Currency}-${Currency}` = `${from}-${to}`;
  const pair2: `${Currency}-${Currency}` = `${to}-${from}`;
  if (store.rates[pair1] !== undefined) {
    return store.rates[pair1];
  } else if (store.rates[pair2] !== undefined) {
    return 1 / store.rates[pair2];
  }
  return 0;
}

function onFromAmountChange() {
  const fromNum = parseFloat(fromAmount.value) || 0;
  const rate = getRate(fromCurrency.value, toCurrency.value);
  toAmount.value = (fromNum * rate).toFixed(4);
}

function onToAmountChange() {
  const toNum = parseFloat(toAmount.value) || 0;
  const rate = getRate(fromCurrency.value, toCurrency.value);
  if (rate === 0) {
    fromAmount.value = "0";
  } else {
    fromAmount.value = (toNum / rate).toFixed(4);
  }
}

watch([fromCurrency, toCurrency], () => {
  onFromAmountChange();
});

watch(
  () => store.rates,
  (newVal) => {
    if (Object.keys(newVal).length) {
      onFromAmountChange();
    }
  },
  { immediate: true }
);
</script>
