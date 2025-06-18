<template>

</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/main";

const store = useMainStore()

store.getCurrency()

</script>