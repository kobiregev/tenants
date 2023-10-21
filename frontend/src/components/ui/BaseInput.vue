<script setup>
defineProps({
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type:[String, Number, Boolean]
  }
})
defineEmits(['update:modelValue'])
</script>
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :type="type"
    class="flex rounded-md border focus:outline-emerald-500 p-0.5"
  />
</template>
