import api from './axios'

export async function login(username, password) {
  try {
    const response = await api.post('/auth', { username, password })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}

export async function logout() {
  try {
    const response = await api.get('/auth')
    return [response.data, null];
  } catch (error) {
    return [null, error]
  }
}
