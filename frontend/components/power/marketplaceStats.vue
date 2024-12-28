<template>
  <div class="py-16 sm:py-24">
    <div class="mx-auto max-w-7xl ">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <div class="text-center">
          <h2 class="font-bold text-white tracking-tight text-3xl sm:text-4xl">Friends Help Friends</h2>
          <p class="mt-4 text-lg text-gray-300 leading-8">More friends you help, more profit you earn.</p>
        </div>
        <dl class="rounded-2xl mt-16 text-center grid gap-0.5 grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in stats" :key="stat.id" class="flex flex-col bg-white/5 p-8">
            <dt class="font-semibold text-sm text-gray-300 leading-6">{{ stat.name }}</dt>
            <dd class="order-first font-semibold text-white tracking-tight text-3xl">{{ stat.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { id: 1, name: 'Space Hosts', value: '20+' },
  { id: 2, name: 'New friends Joined', value: '5k+' },
  { id: 3, name: 'Goods consume', value: '10K+' },
  { id: 4, name: 'Total Helped', value: '70M $AI' },
]
</script>