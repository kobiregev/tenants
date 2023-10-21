import api from './axios'
import { fetchData } from './fetch'

export async function getTenants() {
  return await fetchData(api.get, '/tenants')
}

export async function updateTenantById(id, data) {
  return await fetchData(api.put, `/tenants/${id}`, data)
}

export async function deleteTenantById(id) {
  return await fetchData(api.delete, `/tenants/${id}`)
}

export async function createTenant(tenant){
  return await fetchData(api.post,`/tenants`,tenant)
}