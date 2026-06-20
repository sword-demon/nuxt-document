export default defineNuxtPlugin((_nuxtApp) => {
  const toast = useToast()
  const $api = $fetch.create({
    baseURL: 'http://localhost:3333',
    headers: {
      'Content-Type': 'application/json'
    },
    onRequest: () => {
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
    onRequestError: () => {
      console.log('请求发生错误')
      toast.add({
        title: '网络连接错误'
      })
    },
    onResponseError: (err) => {
      console.log('onResponseError', err)
    }
  })

  return {
    provide: {
      api: $api
    }
  }
})
