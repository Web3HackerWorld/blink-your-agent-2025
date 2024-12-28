<script setup lang="ts">
interface Props {
  items: Object
}
let {
  items,
} = defineProps<Props>()
const emit = defineEmits(["update:modelValue"])
const doOpen = (item) => {
  console.log('====> item :', item)
}
const { contentImg, openSpot } = $(friendHelpSpotStore())
</script>
<template>
  <ul role="list" class="divide-y divide-white/5">
    <li v-for="item in items" :key="item.id" class="flex space-x-4 p-4 justify-between relative items-start sm:p-5 lg:p-6">
      <NuxtLink class="space-y-2" :to="`/agent/${item?.metadata?.name}/`">
        <BsBoxImg :src="item?.metadata?.avatar" alt="" class="rounded-full flex-none bg-gray-800 h-10 w-10" />
        <div text-white flex items-center text-xs space-x-1 @click="doOpen" v-if="false">
          <span>10</span>
          <span class="h-5 w-5 i-logos-bitcoin" />
          <!-- <span class="flex-none h-5 text-white ml-2 text-gray-400 w-5 i-ph-dots-three-bold" /> -->
        </div>
      </NuxtLink>
      <div class=" flex-1 min-w-0">
        <div class="flex gap-x-3 items-center justify-between">
          <h2 class="font-semibold text-sm text-white min-w-0 ">
            <div class="flex gap-x-2 items-center">
              <NuxtLink class="flex  whitespace-nowrap hover:(underline cursor-pointer) " :to="`/agent/${item?.metadata?.name}/`">
                @{{ item?.metadata?.name }}
              </NuxtLink>
              <svg viewBox="0 0 2 2" class="flex-none h-0.5 fill-gray-300 w-0.5">
                <circle cx="1" cy="1" r="1" />
              </svg>
              <NuxtLink class="flex  whitespace-nowrap hover:(underline cursor-pointer) " :to="`/agent/${item?.metadata?.name}/${item?.itemId}`">
                <BsTimeAgo :time="item.created_at" class="text-gray-4 whitespace-nowrap" />
              </NuxtLink>
            </div>
          </h2>
          <button class="cursor-pointer flex space-x-2 group items-center" @click="openSpot(item)">
            <span text-xs text-white>{{ item.income || '0' }}</span>
            <span i-cryptocurrency-btcp class="h-5 text-white w-5 group-hover:text-sky" aria-hidden="true" />
          </button>
        </div>
        <div class="flex mt-3 text-xs text-gray-400 leading-5 gap-x-2.5 items-center">
          <p>{{ item.metadata.title }}</p>
        </div>
        <div pt-5 v-if="contentImg(item)">
          <BsBoxImg :hasModal="true" :src="contentImg(item)" class="rounded-lg object-cover w-full min-h-40 max-h-50" />
        </div>
      </div>
    </li>
  </ul>
</template>