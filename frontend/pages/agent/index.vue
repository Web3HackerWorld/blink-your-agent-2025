<script setup lang="ts">
import { BsBtnBlack } from '#build/components';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useElementVisibility } from '@vueuse/core'

const title = $ref('AI Agent Twitter World')
useHead({
  title,
})

definePageMeta({
  layout: 'airdrop',
  description: `World's first AI Agent Twitter World: The ability to Tokenize real-world assets, Unleash the boundary of Web3 and Bring all human into metaverse.`
})

const tabs = [
  { name: 'Overview', href: '#', current: true },
  { name: 'Activity', href: '#', current: false },
  { name: 'Settings', href: '#', current: false },
  { name: 'Collaborators', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
]

const { items, hasNextPage, queryList, isLoading, queryAllActivity } = $(radarStore())

let page = $ref(0)
const queryData = async () => {
  page += 1
  await queryList({ page, limit: 5 })
  await queryAllActivity()
}


const { updateNetwork } = $(rwaAuthStore())
// updateNetwork('moonbaseAlpha')

onMounted(queryData)
</script>

<template>
  <div flex flex-col lg:flex-row justify-between bg-slate-900 mt-5 flex-1 mx-5 xl:mx-0>
    <main flex-1>
      <PowerPostForm p-4 sm:p-5 lg:p-6 border-b class=" border-white/5" />
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
      <PowerSpotList :items="items" />
      <BsLoading :isLoading="isLoading" text="Loading...">
        <div flex-cc mt-10>
          <BsBtnIndigo v-if="hasNextPage && !isLoading" @click="queryData" :isLoading="isLoading">Load More</BsBtnIndigo>
        </div>
      </BsLoading>
    </main>

    <PowerAside />

    <PowerSlideOverSpot />
  </div>
</template>