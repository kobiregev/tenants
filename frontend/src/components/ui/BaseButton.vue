<script setup>
defineProps({ variant: String })
const styles = {
  primary: ['text-white', 'bg-emerald-500'],
  delete: ['text-white', 'bg-red-500'],
  info: ['text-white', 'bg-yellow-500']
}
</script>
<template>
  <button
    class="rounded-md font-semibold px-2 py-1 inline-flex items-center justify-center gap-2 transform active:scale-75 transition-transform "
    :class="styles[variant || 'primary']"
  >
    <slot></slot>
  </button>
</template>
