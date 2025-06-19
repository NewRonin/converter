<template>
  <header>
    <nav>
      <div class="links">
        <div
          v-for="link in links"
          :class="[link.enabled || link.custom ? 'link' : 'link-disabled']"
        >
          <NuxtLink
            v-if="!link.custom"
            :to="link.link"
          >
            {{ link.name }}
          </NuxtLink>

          <div v-else>
            {{ link.name }}
          </div>
        </div>
      </div>
      <div class="currency-select">
        <InputDropdown 
            class="container-filters-item"
            v-model="currentCurrency"
            :optionsList="currencyOptions || undefined"
            label="Валюта"
        />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { currencyList } from "@/types/currency"
import { useMainStore } from "@/stores/main";

const store = useMainStore()

const links: HeaderLink[] = [
  { name: "Главная", link: "/", enabled: true },
  { name: "Конвертер", link: "/convert", enabled: true },
];

const currentCurrency = ref(store.selectedCurrency)
const currencyOptions: DropdownOption[] = currencyList.map((item) => ({
  id: item,
  value: item,
  name: item.toUpperCase(),
}))

watch (currentCurrency, (newValue) => {
    store.setCurrency(currentCurrency.value)
})
</script>

<style scoped lang="scss">
header {
  width: 100%;
  height: 10rem;
  overflow-x: hidden;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  nav {
    z-index: 100;
    position: fixed;
    width: 100%;
    padding: 2rem 6.4rem;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    border-radius: 0 0 2rem 2rem;
    background: var(--primary);
    color: var(--primary-light);

  }
}

.links {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 5.6rem;

  font-size: 1.6rem;
  font-weight: 600;
}

.link {
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  @include hover {
    color: var(--accent-light);
    cursor: pointer;
  }
}

.link-disabled {
  display: none;
}

:deep(.select-block-picker){
  background: var(--primary-light);
}
</style>
