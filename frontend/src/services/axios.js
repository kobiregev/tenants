import axios, { HttpStatusCode } from 'axios'
import { getTokenFromLocalStorage } from '../utils/utils'
import { useUserStore } from '../stores/userStore'

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage()}`
  },
  withCredentials: true
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getTokenFromLocalStorage()}`
  return config;
})

// Intercept any authorization error and kick out user
instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const { status } = error.response
    const userStore = useUserStore()

    if (status === HttpStatusCode.Unauthorized || status === HttpStatusCode.Forbidden) {
      userStore.signOut()
    }

    return Promise.reject(error)
  }
)

export default instance
