<script setup lang="ts">

const { rewardListData, rewardLoading, loadRewardItems } = $(taskStore())

onMounted(async () => {
  await loadRewardItems('ai-agent-s1')
})

const statuses = { collected: 'text-green-400 bg-green-400/10', waitForCollect: 'text-white', waitForVerify: 'text-lime-4 bg-lime-4/10', Error: 'text-rose-400 bg-rose-400/10' }

const twitterLink = item => `https://Twitter.com/${item.name}`
</script>

<template>
  <div class="py-5">
    <h2 class="flex font-semibold text-base text-white px-4 leading-7 items-center sm:px-6 lg:px-8">
      <div class="border-b flex border-white/40 pb-3">
        <span mr-4 text-lg>Total Issued Tasks:</span>
        <BsLoadingIcon v-if="rewardLoading" />
        <span v-else> {{ rewardListData.count }} </span>
      </div>
    </h2>
    <BsLoading class="py-5" :is-loading="rewardLoading">
      <table class="mt-6 text-left w-full whitespace-nowrap">
        <!-- <colgroup>
          <col class="w-full sm:w-4/12" />
          <col class="lg:w-4/12" />
          <col class="lg:w-2/12" />
        </colgroup> -->
        <thead class="border-b border-white/10 text-sm text-white leading-6">
          <tr>
            <th scope="col" class="font-semibold py-2 pr-8 pl-4 sm:pl-6 lg:pl-8">User</th>
            <th scope="col" class="font-semibold py-2 pr-8 pl-0">Task</th>
            <th scope="col" class="font-semibold py-2 pr-8 pl-0">Reward ($AI)</th>
            <th scope="col" class="font-semibold text-right py-2 pr-4 pl-0 sm:text-left sm:pr-8 lg:pr-20">Status</th>
            <!-- <th scope="col" class="font-semibold py-2 pr-8 pl-0 hidden md:table-cell lg:pr-20">Duration</th> -->
            <th scope="col" class="font-semibold text-right py-2 pr-4 pl-0 sm:pr-6 lg:pr-8">Created at</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="item in rewardListData.items" :key="item.id">
            <td class="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
              <a :href="twitterLink(item)" target="_blank" class="flex gap-x-4 items-center">
                <img :src="item.avatar" alt="" class="rounded-full bg-gray-800 h-8 w-8" />
                <div class="font-medium text-sm text-white leading-6 truncate hidden sm:block">{{ item.name }}</div>
              </a>
            </td>
            <td class="py-4 pr-4 pl-0 sm:pr-8">
              <div class="flex gap-x-3">
                <div class="font-mono text-sm text-gray-400 leading-6 truncate">{{ item.action }}</div>
                <!-- <div class="rounded-md font-medium bg-gray-700/40 ring-inset text-xs py-1 px-2 ring-1 ring-white/10 text-gray-400">branche</div> -->
              </div>
            </td>
            <td class="py-4 pr-4 pl-0 sm:pr-8">
              <div class="flex gap-x-2">
                <div class="font-mono text-sm text-gray-400 leading-6 truncate">{{ item.amount }}</div>
                <span class="h-5 w-5 i-logos-bitcoin" />
                <!-- <div class="rounded-md font-medium bg-gray-700/40 ring-inset text-xs py-1 px-2 ring-1 ring-white/10 text-gray-400">{{ item.branch }}</div> -->
              </div>
            </td>
            <td class="text-sm py-4 pr-4 pl-0 leading-6 sm:pr-8 lg:pr-20">
              <div class="flex gap-x-2 items-center justify-end sm:justify-start">
                <time class="text-gray-400 sm:hidden" :datetime="item.created_at">{{ item.created_at }}</time>
                <div :class="[statuses[item.status], 'flex-none rounded-full p-1']">
                  <div class="bg-current rounded-full h-1.5 w-1.5" />
                </div>
                <div class="text-white hidden sm:block">{{ item.status }}</div>
              </div>
            </td>
            <!-- <td class="text-sm py-4 pr-8 pl-0 text-gray-400 leading-6 hidden md:table-cell lg:pr-20">{{ item.duration }}</td> -->
            <td class="text-right text-sm py-4 pr-4 pl-0 text-gray-400 leading-6  sm:pr-6 lg:pr-8">
              <time :datetime="item.created_at">{{ formatTime(item.created_at) }}</time>
            </td>
          </tr>
        </tbody>
      </table>
    </BsLoading>
  </div>
</template>
