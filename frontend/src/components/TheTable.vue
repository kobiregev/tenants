<script setup>
import { inject } from 'vue'
const tenants = inject('tenants')
const deleteTenant = inject('deleteTenant')
const openDialog = inject('openDialog')
</script>

<template>
  <div class="block w-full overflow-x-auto border">
    <table class="items-center bg-transparent w-full border-collapse">
      <thead>
        <tr>
          <th
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
          >
            Name
          </th>
          <th
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
          >
            Address
          </th>
          <th
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
          >
            Phone Number
          </th>
          <th
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
          >
            Debt
          </th>
          <th
            class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody v-if="tenants.length > 0">
        <tr v-for="tenant in tenants" :key="tenant._id" class="border-b">
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ tenant.name }}
          </td>
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ tenant.address }}
          </td>
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ tenant.phoneNumber }}
          </td>
          <td
            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ tenant.financialDebt }}
          </td>
          <td
            class="flex gap-2 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <BaseButton variant="info" @click="openDialog(tenant)">Edit</BaseButton>
            <BaseButton variant="delete" @click="deleteTenant(tenant._id)">Delete</BaseButton>
          </td>
        </tr>
      </tbody>
      <tr v-else class="relative p-2 text-center text-blueGray-500 font-normal">
        No Tenants Found...
      </tr>
    </table>
  </div>
</template>
