export const useMutation = <T>(
  url: string,
  options?: Parameters<typeof useFetch<T>>[1]
) => {
  const { $api } = useNuxtApp()
  const fetch = useFetch<T>(url, {
    immediate: false, // 不立刻执行请求
    server: false, // ssr 端不要执行
    ...options,
    $fetch: $api
  })
  return fetch
}
