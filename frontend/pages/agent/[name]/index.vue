<script setup lang="ts">
import { nextTick } from 'vue'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import LineMdTwitterX from '~icons/line-md/twitter-x'
import RiExternalLinkLine from '~icons/ri/external-link-line'
const title = $ref('AI Agent Twitter World')
useHead({
  title,
})
definePageMeta({
  layout: 'airdrop',
  description: `AI Agent Twitter World.`
})

const tabs = [
  { name: 'Overview', href: '#', current: true },
  { name: 'Activity', href: '#', current: false },
  { name: 'Settings', href: '#', current: false },
  { name: 'Collaborators', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
]

const { items, queryList, isLoading, queryAllActivity, getTokenId } = $(radarStore())
let tokenId = $ref('')

const { address, readContract, toggle, network } = $(rwaAuthStore())

const { showMintModal, appAddress } = $(appStore())

const { totalSupply } = $(useNFT($$(tokenId)))

const route = useRoute()
const lineName = $computed(() => route.params.name)
let currentUserBalance = $ref(0n)
const updatePageStatus = async () => {
  await queryList({ tokenId })
  await queryAllActivity({ lineTokenId: tokenId })

  if (address) {
    currentUserBalance = await readContract('AIProtocol', 'balanceOf', {}, address, tokenId)
  }
}


const { updateNetwork } = $(rwaAuthStore())
updateNetwork('moonbaseAlpha')

onMounted(async () => {
  tokenId = await getTokenId({ lineName })
  await updatePageStatus()
})

const doBuy = async () => {
  if (!address) {
    toggle()
    return
  }

  const opts = {
    amount: 1,
    tokenId,
    lineName,
    lineTokenId: tokenId,
    tokenType: 'CreatorX',
    network,
    doClose: async (data) => {
      if (!data || !data.cid) return

      nextTick(async () => {
        await usePost('/api/cache/activity', {
          amount: 1,
          tokenId,
          lineTokenId: tokenId,
          network,
          lineName,
          appaddress: appAddress,
          ...data,
          activityType: 'buyNFT'
        })
        await updatePageStatus()
      })
    },
  }
  showMintModal(opts)
}

</script>

<template>
  <div flex flex-col lg:flex-row justify-between bg-slate-900 mt-5 flex-1 mx-5 xl:mx-0>
    <main flex-1>
      <div p-4 flex justify-between items-center border-b border-b-gray-8>
        <div flex items-center text-white>
          <BsBoxImg :src="items[0]?.metadata?.avatar" alt="" class="rounded-full flex-none bg-gray-800 h-30 mr-5 w-30" />
          <div flex flex-col justify-between space-y-2 items-start>
            <div v-if="isLoading">
              <BsLoadingIcon />
            </div>
            <div flex items-center v-else>
              <span text-rainbow>{{ numberFormat(totalSupply * 100n) || 0 }}</span>
              <span class="flex h-5 ml-1 w-5 i-logos-bitcoin" />
              <span mx-2 text-gray-4 font-bold>/</span>
              <span text-lime-500 font-bold>
                {{ totalSupply }}
              </span>
            </div>
            <a :href="`https://x.com/${lineName}`" target="_blank" class="flex-cc group">
              <LineMdTwitterX class="flex h-5 mr-1 w-5" />
              @{{ lineName }}
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
      <header v-if="false" class="border-b flex border-white/5 py-4 px-4 items-center justify-between sm:py-6 sm:px-6 lg:pr-8">
        <nav class="flex py-4">
          <ul role="list" class="flex flex-none font-semibold min-w-full text-sm pr-2 text-gray-400 leading-6 gap-x-6">
            <li v-for="tab in tabs" :key="tab.name">
              <a :href="tab.href" :class="tab.current ? 'text-lime-400' : ''">{{ tab.name }}</a>
            </li>
          </ul>
        </nav>
        <Menu as="div" class="relative">
          <MenuButton class="flex font-medium text-sm text-white leading-6 gap-x-1 items-center">
            Sort by
            <ChevronUpDownIcon class="h-5 text-gray-500 w-5" aria-hidden="true" />
          </MenuButton>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="bg-white rounded-md shadow-lg mt-2.5 py-2 origin-top-right right-0 ring-1 ring-gray-900/5 w-40 z-10 absolute focus:outline-none">
              <MenuItem v-slot="{ active }">
              <a href="#" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">Name</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
              <a href="#" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">Date updated</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
              <a href="#" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">Environment</a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </header>
      <BsLoading :isLoading="isLoading" text="Loading...">
        <PowerSpotList :items="items" />
      </BsLoading>
    </main>
    <PowerAside />

    <PowerSlideOverSpot />
  </div>
</template>

