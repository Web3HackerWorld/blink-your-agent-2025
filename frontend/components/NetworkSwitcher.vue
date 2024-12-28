<script setup lang="ts">
  import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
  } from '@headlessui/vue'
  import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
  import IconBevm from '~/assets/bevm.jpg'
  import IconMA from '~/assets/moonbaseAlpha.jpg'
  import DeviconPolygon from '~icons/devicon/polygon'
  import VscodeIconsFileTypeHardhat from '~icons/vscode-icons/file-type-hardhat'
  import TokenBrandedBinanceSmartChain from '~icons/token-branded/binance-smart-chain'

  let { network } = $(rwaAuthStore())

  const isDebug = $(inject('isDebug'))

  const hardhatConfig = $computed(() => {
    if (isDebug || process.env.NODE_ENV === 'development') {
      return [
        {
          title: 'Hardhat',
          icon: VscodeIconsFileTypeHardhat,
          network: 'hardhat',
          current: network === 'hardhat',
        },
      ]
    }

    return []
  })

  const items = $computed(() => {
    return [
      // { title: 'CBK', icon: IconBevm, network: 'cbk', current: false },
      // { title: "BEVM Canary", img: IconBevm, network: "bevm-canary", current: network === "bevm-canary" },
      // { title: "BEVM Canary Testnet", img: IconBevm, network: "bevmCanaryTestnet", current: network === "bevmCanaryTestnet" },
      // { title: "BEVM Testnet", img: IconBevm, network: "bevmTestnet", current: network === "bevmTestnet" },
      // { title: "Polygon", icon: DeviconPolygon, network: "polygon", current: network === "polygon" },
      // {
      //   title: "BSC Testnet",
      //   icon: TokenBrandedBinanceSmartChain,
      //   network: "binanceSmartChainTestnet",
      //   current: network === "binanceSmartChainTestnet",
      // },
      // { title: "Moonbase Alpha", img: IconMA, network: "moonbaseAlpha", current: network === "moonbaseAlpha" },
      {
        title: 'HashKey Testnet',
        img: 'https://docs.hsk.xyz/~gitbook/image?url=https%3A%2F%2F2707467707-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Forganizations%252FnLCDM3SWnWBABEaj6VAe%252Fsites%252Fsite_qbeUA%252Ficon%252FXsyUhnceAqzSi2cpUQgy%252FHSK%25E7%25A1%25AE%25E5%25AE%259A%25E7%2589%2588%2520%281%29.png%3Falt%3Dmedia%26token%3Dac447c94-2597-404f-b91b-a8908e3a8b83&width=32&dpr=2&quality=100&sign=2c9fc9d0&sv=2',
        network: 'hashKeyTestnet',
        current: network === 'hashKeyTestnet',
      },
      ...hardhatConfig,
    ]
  })

  const selected = $computed({
    get() {
      const item = items.find((item) => item.current)
      if (!item) {
        return items[0]
      }
      return item
    },
    set(val) {
      network = val.network
    },
  })
</script>

<template>
  <Listbox
    as="div"
    v-model="selected">
    <ListboxLabel class="sr-only">Change Network</ListboxLabel>
    <div class="relative">
      <div class="">
        <ListboxButton
          class="rounded-md bg-lime-600 shadow-sm inline-flex items-center">
          <span class="sr-only">Change network</span>
          <div class="text-white py-2 px-3 gap-x-1.5 inline-flex items-center">
            <component
              v-if="selected.icon"
              :is="selected.icon"
              class="rounded-full h-5 -ml-0.5 w-5"
              aria-hidden="true" />
            <img
              v-if="selected.img"
              :src="selected.img"
              class="rounded-full h-5 -ml-0.5 w-5"
              aria-hidden="true" />
            <p class="font-semibold text-sm hidden md:block">
              {{ selected.title }}
            </p>
          </div>
          <ChevronDownIcon
            class="h-5 text-white mr-2 w-5 hidden md:block"
            aria-hidden="true" />
        </ListboxButton>
      </div>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions
          class="divide-y bg-white rounded-md divide-gray-200 shadow-lg ring-black mt-2 origin-top-right right-0 ring-1 ring-opacity-5 w-72 z-10 absolute overflow-hidden focus:outline-none">
          <ListboxOption
            as="template"
            v-for="option in items"
            :key="option.title"
            :value="option"
            v-slot="{ active, selected }">
            <li
              :class="[
                active ? 'bg-lime-600 text-white' : 'text-gray-900',
                'cursor-default select-none p-4 text-sm',
              ]">
              <div class="flex flex-col">
                <div class="flex justify-between">
                  <p
                    :class="selected ? 'font-semibold' : 'font-normal'"
                    class="flex">
                    <component
                      v-if="option.icon"
                      :is="option.icon"
                      class="rounded-full h-5 -ml-0.5 w-5"
                      aria-hidden="true" />
                    <img
                      v-if="option.img"
                      :src="option.img"
                      class="rounded-full h-5 -ml-0.5 w-5"
                      aria-hidden="true" />
                    <span class="ml-2">{{ option.title }}</span>
                  </p>
                  <span
                    v-if="selected"
                    :class="active ? 'text-white' : 'text-lime-600'">
                    <CheckIcon
                      class="h-5 w-5"
                      aria-hidden="true" />
                  </span>
                </div>
                <p :class="[active ? 'text-lime-200' : 'text-gray-500']">
                  {{ option.description }}
                </p>
              </div>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
