<template>
  <div class="input-container">
    <label class="text-input-label">
      <span>
        {{ label }}
        <span v-if="required" class="required"> * </span>
      </span>
    </label>
    <input
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      class="text-input"
      :class="[errorMessage ? 'has-error' : '']"
      ref="input"
      :data-maska="data_mask"
    />
  </div>
</template>

<script setup>
import { vMaska } from 'maska'

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  data_mask: { type: String, required: false }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== inputValue.value) {
      inputValue.value = val
    }
  },
  { immediate: true }
)

watch(inputValue, (val) => {
  emit('update:modelValue', val)
})

const errorMessage = ref(false)
</script>

<style scoped lang="scss">
.input-container {
  width: 100%;
  font-size: 1.4rem;
}

.text-input-label {
  display: block;
  margin-bottom: 0.8rem;
}

.text-input {
  width: 100%;
  padding: 1.2rem;
  border: 1px solid var(--border);
  border-radius: 0.6rem;
  background-color: transparent;

  &:focus {
    outline: none;
    border-color: var(--accent);
  }

  &::placeholder {
    color: var(--inactive);
  }
}

.text-input.has-error {
  border-color: var(--error);
}

.required {
  color: var(--error);
}
</style>
