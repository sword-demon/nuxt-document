<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const toast = useToast()

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: '账号',
    placeholder: '请输入登录账号',
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
  }
]

const schema = z.object({
  email: z.email('请输入正确的账号'),
  password: z.string('请输入登录密码').min(8, '密码不能少于 8 个字符')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
  toast.add({
    title: '登录成功',
    color: 'success'
  })
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
