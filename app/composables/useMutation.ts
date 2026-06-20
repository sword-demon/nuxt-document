import type { UseFetchOptions } from '#app'

export const useMutation = <T>(
  url: string,
  options: UseFetchOptions<T> & {
    onSuccess: (data: T) => void
  }
) => {
  const data = ref<Record<string, any> | {}>({})
  const { $api } = useNuxtApp()
  const fetch = useFetch<T>(url, {
    method: 'POST',
    immediate: false, // 不立刻执行请求
    body: data,
    server: false, // ssr 端不要执行
    $fetch: $api,
    ...(options as any),
    onResponse(res) {
      if (res.response.ok) {
        options.onSuccess(res.response._data as T)
      }
    }
  })

  const onSubmit = async (payload: { data: Record<string, any> }) => {
    data.value = payload.data
    await fetch.execute()
  }
  return {
    ...fetch,
    onSubmit
  }
}
