<script setup>
import { ref } from 'vue'

const props = defineProps(['tenant', 'mode'])
const emit = defineEmits(['close'])
const tenant = ref(props.tenant)

function handleSubmit(event) {
  emit('close', event, { mode: props.mode, data: tenant.value })
}
</script>
<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <div>
      <label>Name</label>
      <BaseInput v-model.trim="tenant.name" type="text" required />
    </div>
    <div>
      <label>Address</label>
      <BaseInput v-model.trim="tenant.address" type="text" required />
    </div>
    <div>
      <label>Phone</label>
      <BaseInput v-model.trim="tenant.phoneNumber" type="text" required />
    </div>
    <div>
      <label>Debt</label>
      <BaseInput v-model.number="tenant.financialDebt" type="number" required />
    </div>
    <BaseButton> Save </BaseButton>
  </form>
</template>
