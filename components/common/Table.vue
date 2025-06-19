<template>
  <table class="table-container">
    <thead>
      <tr>
        <th v-for="header in headers">{{ header.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="key in keys" :key="key">{{ row[key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

type Headers = {
  name: string,
  value: string,
}

const props = defineProps<{
  headers: Headers[];
  rows: Record<string, any>[];
}>();

const keys = computed(() => props.headers.map(x => x.value));
</script>

<style scoped>
.table-container {
  width: 100%;
  border-collapse: collapse;
}

.table-container th,
.table-container td {
  border: 1px solid var(--border);
  padding: 0.5rem 1rem;
  text-align: left;
}

.table-container thead {
  background-color: var(--primary-light);
}
</style>
