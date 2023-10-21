<script setup>
import TenantForm from './TenantForm.vue'
defineProps({
  open: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <BaseDialog v-if="open" @close="closeEditDialog">
    <template #header>
      <h2>Edit Tenant</h2>
    </template>
    <template #default>
      <TenantForm :tenant="selectedTenant" @close="closeEditDialog" />
    </template>
  </BaseDialog>
</template>
