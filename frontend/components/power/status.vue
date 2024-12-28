<script setup lang="ts">

const stats = [
  { id: 1, name: 'Creators on the platform', value: '8,000+' },
  { id: 2, name: 'Flat platform fee', value: '3%' },
  { id: 3, name: 'Uptime guarantee', value: '99.9%' },
  { id: 4, name: 'Paid out to creators', value: '$70M' },
]
</script>
<template>
  <dl class="rounded-2xl text-center grid gap-0.5 grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
    <div v-for="stat in stats" :key="stat.id" class="flex flex-col bg-white/5 p-8">
      <dt class="font-semibold text-sm text-gray-300 leading-6">{{ stat.name }}</dt>
      <dd class="order-first font-semibold text-white tracking-tight text-3xl">{{ stat.value }}</dd>
    </div>

  </dl>
</template>