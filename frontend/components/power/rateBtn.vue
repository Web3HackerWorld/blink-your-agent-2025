<script setup lang="ts">
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'

const publishingOptions = [
  { title: 'Published', description: 'This job posting can be viewed by anyone who has the link.', current: true },
  { title: 'Draft', description: 'This job posting will no longer be publicly accessible.', current: false },
]

const selected = ref(publishingOptions[0])

// btn color + number
</script>
<template>
  <Listbox as="div" v-model="selected">
    <ListboxLabel class="sr-only">Change published status</ListboxLabel>
    <div class="relative">
      <div class="divide-x rounded-md divide-lime-700 shadow-sm inline-flex">
        <div class="rounded-l-md bg-lime-600 shadow-sm text-white py-2 px-3 gap-x-1.5 inline-flex items-center">
          <!-- <CheckIcon class="h-5 -ml-0.5 w-5" aria-hidden="true" /> -->
          <p class="font-semibold text-sm">100</p>
        </div>
        <ListboxButton class="rounded-l-none rounded-r-md bg-lime-600 p-2 inline-flex items-center hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-offset-2 focus:ring-offset-gray-50">
          <span class="sr-only">Change published status</span>
          <span i-fa6-solid-handshake-angle class="h-5 text-white w-5" aria-hidden="true" />
        </ListboxButton>
      </div>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="divide-y bg-white rounded-md divide-gray-200 shadow-lg ring-black mt-2 origin-top-right right-0 ring-1 ring-opacity-5 w-72 z-10 absolute overflow-hidden focus:outline-none">
          <ListboxOption as="template" v-for="option in publishingOptions" :key="option.title" :value="option" v-slot="{ active, selected }">
            <li :class="[active ? 'bg-lime-600 text-white' : 'text-gray-900', 'cursor-default select-none p-4 text-sm']">
              <div class="flex flex-col">
                <div class="flex justify-between">
                  <p :class="selected ? 'font-semibold' : 'font-normal'">{{ option.title }}</p>
                  <span v-if="selected" :class="active ? 'text-white' : 'text-lime-600'">
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <p :class="[active ? 'text-lime-200' : 'text-gray-500', 'mt-2']">{{ option.description }}</p>
              </div>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
