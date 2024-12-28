<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'

const tabs = [
  { name: 'All', href: '#', current: true },
  { name: 'Online', href: '#', current: false },
  { name: 'Offline', href: '#', current: false },
]
const team = [
  {
    name: 'Leslie Alexander',
    handle: 'lesliealexander',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'online',
  },
  {
    name: 'Leslie Alexander',
    handle: 'lesliealexander',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'online',
  },
  {
    name: 'Leslie Alexander',
    handle: 'lesliealexander',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'online',
  },
  {
    name: 'Leslie Alexander',
    handle: 'lesliealexander',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'online',
  },
  // More people...
]

const { isOpen } = $(friendHelpNFTStore())

</script>
<template>
  <BsSlideOver v-model:isOpen="isOpen" :isLeft="true">
    <div class="bg-white flex flex-col h-full shadow-xl overflow-y-scroll">
      <div class="pb-6">
        <div class="bg-lime-700 h-24 sm:h-20 lg:h-28" />
        <div class="-mt-12 px-4 flow-root sm:flex sm:-mt-8 sm:px-6 sm:items-end lg:-mt-16">
          <div>
            <div class="flex -m-1">
              <div class="border-white rounded-lg border-4 inline-flex overflow-hidden">
                <img class="flex-shrink-0 h-24 w-24 sm:h-40 sm:w-40 lg:h-48 lg:w-48" src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80" alt="" />
              </div>
            </div>
          </div>
          <div class="mt-6 sm:flex-1 sm:ml-6">
            <div>
              <div class="flex items-center">
                <h3 class="font-bold text-xl text-gray-900 sm:text-2xl">Ashley Porter</h3>
                <span class="rounded-full bg-green-400 flex-shrink-0 h-2 ml-2.5 w-2 inline-block">
                  <span class="sr-only">Online</span>
                </span>
              </div>
              <p class="text-sm text-gray-500">@ashleyporter</p>
            </div>
            <div class="flex flex-wrap space-y-3 mt-5 sm:space-x-3 sm:space-y-0">
              <button type="button" class="rounded-md font-semibold bg-lime-600 flex-shrink-0 shadow-sm text-sm text-white w-full py-2 px-3 inline-flex items-center justify-center sm:flex-1 hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">Message</button>
              <button type="button" class="bg-white rounded-md font-semibold flex-1 shadow-sm ring-inset text-sm w-full py-2 px-3 ring-1 ring-gray-300 text-gray-900 inline-flex items-center justify-center hover:bg-gray-50">Call</button>
              <div class="ml-3 inline-flex sm:ml-0">
                <Menu as="div" class="text-left relative inline-block">
                  <MenuButton class="bg-white rounded-md shadow-sm ring-inset p-2 ring-1 ring-gray-300 text-gray-400 relative inline-flex items-center hover:bg-gray-50">
                    <span class="-inset-1 absolute" />
                    <span class="sr-only">Open options menu</span>
                    <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                  </MenuButton>
                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="bg-white rounded-md shadow-lg ring-black mt-2 origin-top-right right-0 ring-1 ring-opacity-5 w-48 z-10 absolute focus:outline-none">
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View profile</a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Copy profile link</a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border-b border-gray-200">
        <div class="px-6">
          <nav class="flex -mb-px space-x-6">
            <a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="[tab.current ? 'border-lime-500 text-lime-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium']">{{ tab.name }}</a>
          </nav>
        </div>
      </div>
      <ul role="list" class="divide-y divide-gray-200 flex-1 overflow-y-auto">
        <li v-for="person in team" :key="person.handle">
          <div class="flex py-6 px-5 group relative items-center">
            <a :href="person.href" class="flex-1 -m-1 p-1 block">
              <div class="inset-0 absolute group-hover:bg-gray-50" aria-hidden="true" />
              <div class="flex flex-1 min-w-0 relative items-center">
                <span class="flex-shrink-0 relative inline-block">
                  <img class="rounded-full h-10 w-10" :src="person.imageUrl" alt="" />
                  <span :class="[person.status === 'online' ? 'bg-green-400' : 'bg-gray-300', 'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white']" aria-hidden="true" />
                </span>
                <div class="ml-4 truncate">
                  <p class="font-medium text-sm text-gray-900 truncate">{{ person.name }}</p>
                  <p class="text-sm text-gray-500 truncate">{{ '@' + person.handle }}</p>
                </div>
              </div>
            </a>
            <Menu as="div" class="flex-shrink-0 text-left ml-2 relative inline-block">
              <MenuButton class="bg-white rounded-full h-8 w-8 group relative inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2">
                <span class="-inset-1.5 absolute" />
                <span class="sr-only">Open options menu</span>
                <span class="rounded-full flex h-full w-full items-center justify-center">
                  <EllipsisVerticalIcon class="h-5 text-gray-400 w-5 group-hover:text-gray-500" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="bg-white rounded-md shadow-lg ring-black origin-top-right top-0 right-9 ring-1 ring-opacity-5 w-48 z-10 absolute focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View profile</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Send message</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </li>
      </ul>
    </div>
  </BsSlideOver>
</template>