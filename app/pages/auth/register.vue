<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const toast = useToast()

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: '账号',
    placeholder: '请输入注册账号',
    required: true,
    size: 'xl'
  },
  {
    name: 'password',
    label: '密码',
    type: 'password',
    placeholder: '请输入密码',
    required: true,
    size: 'xl'
  },

  {
    name: 'password_confirm',
    label: '确认密码',
    type: 'password_confirm',
    placeholder: '请再次输入密码',
    required: true,
    size: 'xl'
  }
]

const schema = z
  .object({
    email: z.email('请输入正确的账号'),
    password: z.string('请输入注册密码').min(8, '密码不能少于 8 个字符'),
    password_confirm: z.string('请确认密码')
  })
  .refine(data => data.password === data.password_confirm, {
    message: '两次输入的密码不一致',
    path: ['password_confirm']
  })

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
  toast.add({
    title: '注册成功',
    color: 'success'
  })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md shadow-lg lg:mt-3">
      <UAuthForm
        :schema="schema"
        title="注册"
        description="请输入注册账号和密码"
        icon="i-lucide-user"
        :fields="fields"
        :submit="{ label: '注册', size: 'xl' }"
        @submit="onSubmit">
        <template #footer>
          如果您已有账号，请先
          <ULink
            to="/auth/login"
            class="text-primary font-medium"
            >登录
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
