<script setup lang="ts">
import * as z from 'zod'
import { ref } from 'vue'
import type { AuthFormField } from '@nuxt/ui'
import { useMutation } from '~/composables/useMutation'
import type { AuthLoginPost200Response } from '~/types/models/auth-login-post200-response'
import ValidateMessage from '~/components/ValidateMessage.vue'

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
// 响应式数据
// const token = useCookie('token', { maxAge: 60 * 60 * 24 * 7 })
const { login } = useAuth()

const formData = ref<Schema>({
  name: '',
  password: ''
})

const { pending, onSubmit } = useMutation<AuthLoginPost200Response>(
  '/auth/login',
  {
    body: formData,
    // 成功之后调用函数即可
    onSuccess: login
  }
)
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
        :loading="pending"
        @submit="onSubmit"
      >
        <template #footer>
          如果您还没有账号，请先
          <ULink
            to="/auth/register"
            class="text-primary font-medium"
          >
            注册
          </ULink>
          <ULink
            to="/"
            class="text-primary font-medium"
          >
            首页
          </ULink>
        </template>
        <template #validation>
          <ValidateMessage />
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
