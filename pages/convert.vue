<template>
  <div class="converter-container">
    <main>
      <div v-if="!store.loading"class="converter-controls-container">
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
          <input
            type="number"
            v-model.number="fromAmount"
            min="0"
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
          <input
            type="number"
            v-model.number="toAmount"
            min="0"
            @input="onToAmountChange"
            class="converter-input"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useMainStore } from "@/stores/main";

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

const fromAmount = ref<number>(1);
const toAmount = ref<number>(0);

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
  const rate = getRate(fromCurrency.value, toCurrency.value);
  toAmount.value = +(fromAmount.value * rate).toFixed(4);
}

function onToAmountChange() {
  const rate = getRate(fromCurrency.value, toCurrency.value);
  if (rate === 0) {
    fromAmount.value = 0;
  } else {
    fromAmount.value = +(toAmount.value / rate).toFixed(4);
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

<style scoped lang="scss">
.converter-container {
  position: relative;
  padding-top: 5.6rem;
  max-width: 120rem;
  margin: 0 auto;

  main {
    display: flex;
    flex-direction: column;
    gap: 10rem;
  }

  .converter-controls-container {
    display: flex;
    gap: 4rem;
    justify-content: center;
  }

  .converter-field-container {
    display: flex;
    flex-direction: column;
    width: 100%;

    .converter-label {
      font-size: 1.6rem;
      margin-bottom: 0.6rem;
    }

    .converter-select,
    .converter-input {
      font-size: 1.6rem;
      padding: 0.8rem 1.2rem;
      border-radius: 0.25rem;
      border: 1px solid var(--border);
      background-color: var(--app-white);
      color: var(--text-primary);
    }

    .converter-input {
      margin-top: 0.8rem;
    }
  }

  .currency-table {
    font-size: 1.6rem;
    width: 100%;
  }
}
</style>
