<script setup>
import { onMounted, ref, computed, provide } from 'vue'
import TenantForm from './TenantForm.vue'
import { getTenants, updateTenantById, createTenant, deleteTenantById } from '../services/tenants'
import { useDebouncedRef } from '../hooks/debouncedRef'
import TheTable from './TheTable.vue'

const search = useDebouncedRef('', 500)
const sort = ref('all')
const tenants = ref([])
const tenant = ref(null)
const dialogMode = ref('edit')
const isDialogOpen = ref(false)

const filteredTenants = computed(() => {
  let data = tenants.value
  let filterKey = search.value
  let sortValue = sort.value
  if (filterKey || sortValue) {
    filterKey = filterKey.toLowerCase()
    data = data.filter((row) => {
      return Object.keys(row).some((key) => {
        if (!(String(row[key]).toLowerCase().indexOf(filterKey) > -1)) {
          return false
        }
        switch (sortValue) {
          case 'debt':
            return row.financialDebt >= 0
          case 'noDebt':
            return row.financialDebt <= 0
          default:
            return true
        }
      })
    })
  }
  return data
})

onMounted(async () => {
  const [data] = await getTenants()
  tenants.value = data
})

async function updateTenant(tenant) {
  const [data, error] = await updateTenantById(tenant._id, tenant)
  if (error) {
    return
  }
  const tenantIndex = tenants.value.findIndex((t) => t._id === data._id)
  tenants.value[tenantIndex] = data
}
async function addTenant(tenant) {
  const [data, error] = await createTenant(tenant)
  if (error) {
    return
  }
  tenants.value.push(data)
}
async function deleteTenant(id) {
  const [, error] = await deleteTenantById(id)
  if (error) {
    return
  }
  const tenantIndex = tenants.value.findIndex((t) => t._id === id)
  tenants.value.splice(tenantIndex, 1)
}

function openDialog(selectedTenant, mode = 'edit') {
  tenant.value = { ...selectedTenant }
  dialogMode.value = mode
  isDialogOpen.value = true
}

async function closeDialog(_, response) {
  isDialogOpen.value = false
  if (!response) return
  if (response.mode === 'edit') {
    await updateTenant(response.data)
  } else if (response.mode === 'add') {
    addTenant(response.data)
  }
}

provide('tenants', filteredTenants)
provide('deleteTenant', deleteTenant)
provide('openDialog', openDialog)
</script>

<template>
  <div class="md:max-w-screen-sm mx-auto">
    <div class="flex gap-2 w-fit mx-auto my-2">
      <input
        type="search"
        placeholder="Search..."
        v-model.trim="search"
        class="border rounded-md focus:outline-none focus:ring focus:ring-emerald-500 px-1"
      />
      <select v-model="sort" class="border rounded-md">
        <option value="debt">With Debt</option>
        <option value="noDebt">Without Debt</option>
        <option value="all">All</option>
      </select>
      <BaseButton @click="openDialog({}, 'add')">Add Tenant</BaseButton>
    </div>
    <TheTable />
  </div>
  <BaseDialog :open="isDialogOpen" @close="closeDialog">
    <template #header>
      <h2>Edit Tenant</h2>
    </template>
    <template #default>
      <TenantForm :tenant="tenant" @close="closeDialog" :mode="dialogMode" />
    </template>
  </BaseDialog>
</template>
