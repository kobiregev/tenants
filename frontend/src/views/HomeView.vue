<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import TheHome from '../components/TheHome.vue'
const userStore = useUserStore()
const { isAuthenticated } = storeToRefs(userStore)
</script>

<template>
  <nav
    v-if="isAuthenticated"
    class="bg-emerald-500 rounded-b-md text-white px-2 py-1 flex items-center justify-between"
  >
    <p>Hello, Guest</p>
    <h1 class="font-bold underline">Tenant Management</h1>
    <BaseButton @click="userStore.signOut">Logout</BaseButton>
  </nav>
  <main>
    <TheHome />
  </main>
</template>
