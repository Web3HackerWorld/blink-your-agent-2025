<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

interface Props {
  show: boolean
}
let {
  show = false,
} = defineProps<Props>()

const emit = defineEmits(['close'])
const { alertSuccess } = $(notificationStore())

const { miniRequiredGas, needMoreGas, doCollect, isLoading } = $(taskStore())
const { gasBalance, account, currency, chain, updateUserBalance, isUpdatingUserBalance } = $(rwaAuthStore())

const source = $computed(() => account.address)
const { copy } = useClipboard({ source })

const doCopy = () => {
  copy(source)
  alertSuccess('Copy succeed!')
}
</script>

<template>
  <BsDialogDefault :show="show" :no-padding="true" @close="$emit('close')">
    <div class="bg-lime-600 text-white max-w-2xl py-6 px-3 shadow-2xl relative isolate overflow-hidden sm:rounded-3xl sm:px-12 xl:py-8">
      <h2 class="mx-auto mt-10 text-white text-center tracking-tight max-w-2xl text-2xl sm:text-3xl">
        Almost there!
      </h2>
      <p text-center mb-5 mt-4>
        You need at least <span text-red font-bold>{{ miniRequiredGas }} {{ currency }}</span> as gas to collect the $AI
      </p>
      <div flex-cc>
        <div flex flex-col items-center w-full space-y-2>
          <div w-full pt-5>
            Your RWA-Wallet MPC address:
          </div>
          <div flex items-center>
            <input type="url" class="rounded-l-md bg-white/5 border-0 shadow-sm ring-inset text-white w-sm py-2 px-3.5 ring-0 ring-white/10 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-white focus:ring-2" disabled :value="account.address" />
            <BsBtnBlack @click="doCopy" class="border-none! rounded-r-md! rounded-l-none! outline-none! shadow-none! ring-none! py-3!">
              <span i-bxs-copy ml-1></span>
            </BsBtnBlack>
          </div>
          <div text-center space-y-5 pt-10>
            <BsBtnBlack @click="doCopy">Copy your wallet address</BsBtnBlack>
            <div>
              and
            </div>
            <a href="https://faucet.moonbeam.network/" target="_blank" class="bg-black rounded-full flex py-2 px-4 items-center">
              Get Free {{ currency }} on {{ chain.name }} Faucet
            </a>
          </div>
          <div flex space-x-4 pt-10 text-white flex-col items-center space-y-4>
            <div flex items-center>
              Your balance: {{ numberFormat(gasBalance) }} {{ currency }}
              <span class="cursor-pointer h-5 ml-3  w-5 i-material-symbols-sync inline-block" @click="updateUserBalance" :class="isUpdatingUserBalance ? 'animate-spin' : ''"></span>
            </div>
            <BsBtnBlack @click="doCollect" :disabled="needMoreGas || isLoading">
              Collect $AI
            </BsBtnBlack>
          </div>
        </div>
      </div>
      <svg viewBox="0 0 1024 1024" class="h-[64rem] top-1/2 left-1/2 w-[64rem] -z-10 -translate-x-1/2 absolute" aria-hidden="true">
        <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
        <defs>
          <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(512 512) rotate(90) scale(512)">
            <stop stop-color="#7775D6" />
            <stop offset="1" stop-color="#E935C1" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  </BsDialogDefault>
</template>
