<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description: string
    summary?: string
    points?: string[]
  }>(),
  {
    summary: '',
    points: () => []
  }
)
</script>

<template>
  <UPage>
    <UPageHeader
      :title="title"
      :description="description" />

    <UPageBody>
      <UPageCard
        variant="soft"
        class="mb-6">
        <p class="text-sm leading-6 text-muted">
          {{ summary || description }}
        </p>
      </UPageCard>

      <div class="grid gap-4 md:grid-cols-2">
        <UPageCard
          v-for="point in points"
          :key="point"
          :title="point"
          description="当前页面已补齐为有效路由，后续可以在这里继续扩展正式文档内容。" />
      </div>
    </UPageBody>
  </UPage>
</template>
