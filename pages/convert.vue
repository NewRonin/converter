<template>
  <Transition name="fade">
    <div class="page-container">
      <main>
        <div v-if="!store.loading" class="converter-controls-container">
          <div class="converter-field-container">
            <label class="converter-label">Из валюты</label>
            <InputDropdown
              v-model="fromCurrency"
              :label="'Выберите валюту'"
              :optionsList="currencyOptions"
            />
            <InputMain
              v-model="fromAmount"
              type="number"
              placeholder="Введите сумму"
              label="Сумма"
              @input="onFromAmountChange"
            />
          </div>

          <div class="converter-field-container">
            <label class="converter-label">В валюту</label>
            <InputDropdown
              v-model="toCurrency"
              :label="'Выберите валюту'"
              :optionsList="currencyOptions"
            />
            <InputMain
              v-model="toAmount"
              type="number"
              label="Результат"
              placeholder="Результат"
              @input="onToAmountChange"
            />
          </div>
        </div>
      </main>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/main'

const store = useMainStore()
store.getCurrency()

const currencyList = ['usd', 'rub', 'eur', 'brl', 'kzt', 'idr'] as const
type Currency = typeof currencyList[number]

const currencyOptions = currencyList.map((c) => ({
  value: c,
  name: c.toUpperCase()
}))

const fromCurrency = ref<Currency>('usd')
const toCurrency = ref<Currency>('rub')

const fromAmount = ref<string>('1')
const toAmount = ref<string>('0')

const headers = [
  { name: 'Валюта', value: 'currency' },
  { name: 'Курс', value: 'rate' }
]

const conversionRows = computed(() => {
  return currencyList.map((cur) => {
    const pair = `${cur}-${toCurrency.value}` as `${Currency}-${Currency}`
    const rate = store.rates?.[pair] ?? 0
    return {
      currency: cur.toUpperCase(),
      rate: rate.toFixed(4)
    }
  })
})

function getRate(from: Currency, to: Currency): number {
  if (from === to) return 1
  const pair1 = `${from}-${to}` as `${Currency}-${Currency}`
  const pair2 = `${to}-${from}` as `${Currency}-${Currency}`

  if (store.rates?.[pair1] !== undefined) {
    return store.rates[pair1]
  } else if (store.rates?.[pair2] !== undefined) {
    return 1 / store.rates[pair2]
  }
  return 0
}

function onFromAmountChange() {
  const fromNum = parseFloat(fromAmount.value) || 0
  const rate = getRate(fromCurrency.value, toCurrency.value)
  toAmount.value = (fromNum * rate).toFixed(2)
}

function onToAmountChange() {
  const toNum = parseFloat(toAmount.value) || 0
  const rate = getRate(fromCurrency.value, toCurrency.value)
  fromAmount.value = rate ? (toNum / rate).toFixed(2) : '0'
}

watch([fromCurrency, toCurrency], () => {
  onFromAmountChange()
})

watch(
  () => store.rates,
  (newRates) => {
    if (newRates && Object.keys(newRates).length) {
      onFromAmountChange()
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.page-container {
  position: relative;
  padding-top: 5.6rem;
  max-width: 100%;
  margin: 0 auto;

  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10rem;
    padding: 4rem;
  }

  .converter-controls-container {
    display: flex;
    gap: 4rem;
    justify-content: center;
    max-width: 120rem;
  }

  .converter-field-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;

    .converter-label {
      font-size: 1.6rem;
      margin-bottom: 0.6rem;
    }
  }

  .currency-table {
    font-size: 1.6rem;
    width: 100%;
  }
}
</style>
