import { useValidateStore } from '#imports'

export default defineNuxtPlugin((_nuxtApp) => {
  const useValidateErrorStore = useValidateStore()
  // const toast = useToast()
  const $api = $fetch.create({
    baseURL: 'http://localhost:3333',
    headers: {
      'Content-Type': 'application/json'
    },
    onRequest: () => {
      useValidateErrorStore.resetError()
      // 设置 token
    },
    // 响应拦截器
    onResponse: (res) => {
      // console.log('响应处理')
      console.log('onResponse: ', res)
      if (res.response.ok) {
        console.log('操作成功')
      }
    },
    onRequestError: () => {},
    onResponseError: ({ response }) => {
      switch (response.status) {
        case 422: {
          const errors = response._data?.errors as {
            field: string
            message: string
          }[]
          errors.forEach((item) => {
            useValidateErrorStore.setError(item.field, item.message)
          })
          console.log('errors', errors)
          break
        }
      }
    }
  })

  return {
    provide: {
      api: $api
    }
  }
})
