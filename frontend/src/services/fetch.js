export async function fetchData(apiFunction, ...args) {
  try {
    const response = await apiFunction(...args)
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}
