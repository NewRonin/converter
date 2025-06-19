<template>
  <div class="page-container">
    <main>
      <div class="title-container">
        {{ `Курсы валют к ${store.selectedCurrency.toUpperCase()}` }}
      </div>
      <Table
        v-if="!store.loading"
        :headers="headers"
        :rows="rows"
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

const headers = [
  { name: "Валюта", value: "currency" },
  { name: "Курс", value: "rate" },
];

const rows = computed(() => {
  return Object.entries(store.rates)
    .filter(([pair]) => pair.endsWith(`-${store.selectedCurrency}`))
    .map(([pair, rate]) => {
      const currency = pair.split("-")[0].toUpperCase();
      const fixedRate = Number(rate)?.toFixed?.(2) ?? 0.00;
      return { currency,  rate: fixedRate};
    });
});
</script>

<style scoped lang="scss">
.page-container {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 5.6rem;

  main {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 10rem;

    padding: 4rem;

    .currency-table {
      max-width: 120rem;
      font-size: 1.6rem;
    }

    .title-container{
        width: 100%;
        max-width: 120rem;
        font-size: 2rem;
        text-align: left;
    }
  }
}
</style>
