<template>
  <div class="select-block">
    <select
      class="select-block-picker"
      :disabled="props.disabled"
      :autocomplete="props.autocomplete"
      v-model="selectedItem"
      @change="updateSelect"
    >
      <option value="" class="select-block-option" default selected>
        {{ props.label }}
      </option>
      <option
        v-for="option in optionsList"
        :key="option.value"
        :value="option.value"
        class="select-block-option"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: false },
  disabled: { type: Boolean, default: false },
  autocomplete: { type: String, default: "on" },
  optionsList: { type: Array as () => DropdownOption[], required: false },
  modelValue: { type: [String, Number], default: "" }
});

const emit = defineEmits(["update:modelValue"]);

const selectedItem = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  if (val !== selectedItem.value) {
    selectedItem.value = val;
  }
});

function updateSelect() {
  emit("update:modelValue", selectedItem.value);
}
</script>

<style scoped lang="scss">
.select-block {
  position: relative;
  border-radius: 0.6rem;
  .select-block-picker {
    appearance: none;
    width: 100%;
    font-size: 1.15rem;
    padding: 0.675em 6em 0.675em 1em;
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: 0.25rem;
    color: var(--text-primary);

    .select-block-option[default] {
      display: none;
    }

    &:focus {
    outline: none;
    border-color: var(--accent);
  }

  &::placeholder {
    color: var(--inactive);
  }
  }
  &::after {
    position: absolute;
    content: "";
    display: block;
    right: 1rem;
    pointer-events: none;
    border-left: 0.3rem solid transparent;
    border-right: 0.3rem solid transparent;
    border-top: 0.3rem solid var(--text-primary);
    top: 50%;
  }
}

:deep(select) {
  appearance: none; 
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 0.6rem;
}
</style>
