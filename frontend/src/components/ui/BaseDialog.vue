<script setup>
import { onMounted, ref } from 'vue'
defineProps(['open'])
const emit = defineEmits(['close'])
const dialogRef = ref(null)

onMounted(() => dialogRef.value?.focus())

function onClose(event) {
  emit('close', event)
}
</script>
<template>
  <Teleport to="body">
    <div
      v-if="open"
      @click="onClose"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex"
    ></div>
    <transition enter-active-class="animate-fade-in" leave-active-class="animate-fade-out" appear mode="out-in" >
      <dialog
        v-if="open"
        @keydown.esc="onClose"
        tabindex="0"
        open
        ref="dialogRef"
        class="absolute rounded-md shadow-xl overflow-hidden max-w-lg top-[20%] left-[50%] -ml-[150px] z-10"
      >
        <header class="flex justify-between border-b p-2">
          <slot name="header"></slot>
          <BaseButton @click="onClose">&#10005;</BaseButton>
        </header>
        <BaseCard>
          <section class="min-h-[25rem] w-auto">
            <slot name="default"></slot>
          </section>
          <footer>
            <slot name="actions"></slot>
          </footer>
        </BaseCard>
      </dialog>
    </transition>
  </Teleport>
</template>
