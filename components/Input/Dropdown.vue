<template>
  <div class="select-block">
    <select
      class="select-block-picker"
      :disabled="props.disabled"
      :autocomplete="props.autocomplete"
      @change="updateSelect"
      v-model="selectedItem"
    >
      <option value="" class="select-block-option" default selected>
        {{ props.label }}
      </option>
      <option
        v-for="option in optionsList"
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
  label: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: "on",
  },
  optionsList: {
    type: Array<DropdownOption>,
    required: false,
  },
});
const selectedItem = ref<String | Number>("");
const emit = defineEmits(["update:modelValue"]);

function updateSelect() {
  emit("update:modelValue", selectedItem.value);
}
</script>

<style scoped lang="scss">
.select-block {
  position: relative;
  .select-block-picker {
    appearance: none;
    width: 100%;
    font-size: 1.15rem;
    padding: 0.675em 6em 0.675em 1em;
    background-color: var(--app-white);
    border: 1px solid var(--app-grey);
    border-radius: 0.25rem;
    color: var(--app-black);

    .select-block-option[default] {
      display: none;
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
    border-top: 0.3rem solid var(--app-black);
    top: 50%;
  }
}
</style>
