<script setup lang="ts">
import LineMdTwitterX from '~icons/line-md/twitter-x'
import RiExternalLinkLine from '~icons/ri/external-link-line'
import { nextTick } from 'vue'
const { readContract, address, network, toggle } = $(rwaAuthStore())
const { activityContent } = $(friendHelpSpotStore())
const { activityItems, isActivityLoading, queryAllActivity, items } = $(radarStore())

const item = $computed(() => items[0] || {})
const name = $computed(() => item?.metadata?.name)
let nftTotalSupply = $ref(0n)
const route = useRoute()
const lineName = $computed(() => route.params.name)
const itemId = $computed(() => route.params.itemId)
const tokenId = $computed(() => item?.tokenId)
const { showMintModal, appAddress } = $(appStore())

let isLoading = $ref(true)
let currentUserBalance = $ref(0n)

const updatePageStatus = async () => {
  if (tokenId) {
    isLoading = true
    nftTotalSupply = await readContract('AIProtocol', 'totalSupply', {}, tokenId)

    if (address) {
      currentUserBalance = await readContract('AIProtocol', 'balanceOf', {}, address, tokenId)
    }
  }

  isLoading = false
}
watchEffect(updatePageStatus)

const doBuy = async () => {
  if (!address) {
    toggle()
    return
  }

  const opts = {
    amount: 1,
    tokenId,
    itemId,
    lineName,
    lineTokenId: tokenId,
    tokenType: 'CreatorX',
    network,
    doClose: async (data) => {
      if (!data || !data.cid) return

      nextTick(async () => {
        const theData = {
          ...data,
          tokenType: 'CreatorX',
          amount: 1,
          tokenId,
          lineTokenId: tokenId,
          itemId,
          network,
          lineName,
          appaddress: appAddress,
          activityType: 'buyNFT'
        }
        await usePost('/api/cache/activity', theData)
        await updatePageStatus()
        await queryAllActivity({ lineTokenId: tokenId, itemId })
      })
    },
  }
  showMintModal(opts)
}

</script>
<template>
  <aside class=" bg-black/10 lg:border-l  lg:border-white/5 lg:w-4/9 lg:overflow-y-auto">
    <div flex justify-between items-center px-4 text-gray-2 sm:py-6 sm:px-6 lg:px-8 v-if="itemId">
      <div flex items-center text-white>
        <NuxtLink :to="`/agent/${item?.metadata?.name}/`">
          <BsBoxImg :src="item?.metadata?.avatar" alt="" class="rounded-full flex-none bg-gray-800 h-30 mr-5 w-30" />
        </NuxtLink>
        <div flex flex-col justify-between space-y-2 items-start>
          <div v-if="isLoading">
            <BsLoadingIcon />
          </div>
          <div flex items-center v-else>
            <span text-rainbow>{{ numberFormat(nftTotalSupply * 100n) || 0 }}</span>
            <span class="flex h-5 ml-1 w-5 i-logos-bitcoin" />
            <span mx-2 text-gray-4 font-bold>/</span>
            <span text-lime-500 font-bold>
              {{ nftTotalSupply }}
            </span>
          </div>
          <a :href="`https://x.com/${name}`" target="_blank" class="flex-cc group">
            <LineMdTwitterX class="flex h-5 mr-1 w-5" />
            @{{ name }}
            <RiExternalLinkLine class="h-5 ml-1 w-5 hidden group-hover:flex" />
          </a>
        </div>
      </div>
      <div text-white flex flex-col justify-between items-end space-y-2>
        <div v-if="isLoading">
          <BsLoadingIcon />
        </div>
        <div flex-cc v-if="address">
          <span text-rainbow>{{ numberFormat(currentUserBalance * 100n) || 0 }}</span>
          <span class="flex h-5 mx-1 w-5 i-logos-bitcoin" />
          <span mx-2 text-gray-4 font-bold>/</span>
          <span text-lime-500 font-bold>{{ currentUserBalance }}</span>
        </div>
        <BsBtnIndigo class="py-1! px-3!" @click="doBuy">Buy</BsBtnIndigo>
      </div>
    </div>
    <header class="border-b flex border-white/5 py-4 px-4 items-center justify-between sm:py-6 sm:px-6 lg:px-8">
      <h2 class="font-semibold text-base text-white leading-7">Activity feed</h2>
      <!-- <a href="#" class="font-semibold text-sm text-lime-400 leading-6">View all</a> -->
    </header>
    <BsLoading :isLoading="isActivityLoading" text="Loading...">
      <ul role="list" class="divide-y divide-white/5">
        <li v-for="item in activityItems" :key="item.id" class="py-4 px-4 sm:px-6 lg:px-8">
          <div class="flex gap-x-3 items-center">
            <NuxtLink :to="`/agent/${item?.metadata?.name}/`">
              <BsBoxImg :src="item?.metadata?.avatar" alt="" class="rounded-full flex-none bg-gray-800 h-10 w-10" />
            </NuxtLink>

            <NuxtLink :to="`/agent/${item?.metadata?.name}/`" class="flex-auto font-semibold text-sm text-white leading-6 truncate hover:underline">@{{ item?.metadata?.name }}</NuxtLink>
            <NuxtLink :to="`/agent/${item?.lineName}/${item?.itemId || ''}`">
              <BsTimeAgo :time="item.created_at" class="flex-none text-xs text-gray-600" />
            </NuxtLink>

          </div>
          <p class="mt-3 text-sm text-gray-500 truncate">
            {{ activityContent(item) }}
          </p>
        </li>
      </ul>
      <div v-if="activityItems.length === 0 && !isActivityLoading" flex-cc text-gray-5 p-10>
        No activity yet
      </div>
    </BsLoading>
  </aside>
</template>