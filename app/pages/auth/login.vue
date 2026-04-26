<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const toast = useToast()

const fields: AuthFormField[] = [
  {
    name: 'name',
    type: 'text',
    label: '账号',
    placeholder: '请输入登录账号',
    required: true,
    size: 'xl',
    defaultValue: 'admin'
  },
  {
    name: 'password',
    label: '密码',
    type: 'password',
    placeholder: '请输入密码',
    required: true,
    size: 'xl',
    defaultValue: 'admin888'
  }
]

// zod yup adonis 验证
const schema = z.object({
  name: z.string('请输入登录账号').min(3, '账号不能少于 3 个字符'),
  password: z.string('请输入登录密码').min(6, '密码不能少于 8 个字符')
})

type Schema = z.output<typeof schema>

// 新用户 7 天内登录一直有效
const token = useCookie('token', { maxAge: 60 * 60 * 24 * 7 })

interface LoginResponse {
  data: {
    token: {
      token: string
    }
  }
}

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const res = await $fetch<LoginResponse>('http://localhost:3333/auth/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: payload.data,
    // 请求拦截器
    onRequest: () => {
      // 设置 token
    },
    // 响应拦截器
    onResponse: res => {
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
    onResponseError: err => {
      console.log('onResponseError', err)
    }
  })

  // console.log(res.data)
  // 如果是会话浏览器关掉之后就失效了
  token.value = res.data.token.token
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md shadow-lg lg:mt-3">
      <UAuthForm
        :schema="schema"
        title="登录"
        description="请输入登录账号和密码"
        icon="i-lucide-user"
        :fields="fields"
        :submit="{ label: '登录', size: 'xl' }"
        @submit="onSubmit">
        <template #footer>
          如果您还没有账号，请先
          <ULink
            to="/auth/register"
            class="text-primary font-medium"
            >注册
          </ULink>
          <ULink
            to="/"
            class="text-primary font-medium"
            >首页
          </ULink>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
