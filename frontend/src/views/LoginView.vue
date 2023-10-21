<!-- intercept every request if i get unauthorized logout  -->

<script setup>
import {ref } from 'vue'

import { useUserStore } from '@/stores/userStore'
import { login } from '../services/user'

// const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const message = ref('')


async function handleSubmit() {
  isLoading.value = true
  const [data, error] = await login(username.value, password.value)
  isLoading.value = false
  if (error) {
    message.value = error.response?.data[0]?.message || error.message || 'An error has ocurred'
    return
  }
  // handle success save token in localStorage and set global user to authinticated
  await userStore.signIn(data)
}
</script>
<template>
  <section
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-6"
  >
    <h1 class="text-lg font-bold">Tenants</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 items-center">
      <div>
        <label for="username">Username</label>
        <input
          class="flex rounded-md border focus:outline-emerald-500 py-0.5 px-1"
          type="text"
          id="username"
          v-model="username"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          class="flex rounded-md border focus:outline-emerald-500 p-0.5"
          type="password"
          placeholder="••••••••"
          id="password"
          v-model="password"
        />
      </div>
      <button
        class="bg-emerald-600 text-white font-se p-1 w-full rounded-md inline-flex items-center justify-center gap-2"
      >
        <svg
          v-if="isLoading"
          class="animate-spin -ms-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Sign in
      </button>
    </form>
    <p class="flex text-red-400" v-if="message">{{ message }}</p>
  </section>
</template>
