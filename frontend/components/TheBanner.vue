<template>
  <div class="flex bg-gray-50 py-2.5 px-6 gap-x-6 relative isolate items-center overflow-hidden sm:px-3.5 sm:before:flex-1">
    <div class="transform-gpu top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 absolute blur-2xl" aria-hidden="true">
      <div class="bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 w-[36.0625rem] aspect-[577/310]" style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)" />
    </div>
    <div class="transform-gpu top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 absolute blur-2xl" aria-hidden="true">
      <div class="bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 w-[36.0625rem] aspect-[577/310]" style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)" />
    </div>
    <div class="flex flex-wrap w-full text-gray-900 gap-x-4 gap-y-2 items-center justify-center">
      <p class="text-sm  leading-6">
        <strong class="font-semibold">CreatorX Airdrop</strong>
        <svg viewBox="0 0 2 2" class="h-0.5 mx-2 fill-current w-0.5 inline" aria-hidden="true">
          <circle cx="1" cy="1" r="1" />
        </svg>
      </p>
      <p>
        Join us from 01/01
      </p>
      <NuxtLink to="/CreatorX" class="rounded-full flex-none font-semibold bg-gray-900 shadow-sm text-center text-sm text-white w-full py-2 px-3 sm:(py-1 px-3.5 w-auto) hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ">Join now <span aria-hidden="true">&rarr;</span></NuxtLink>
    </div>
    <div class="flex flex-1 justify-end">
      <!-- <button type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]">
        <span class="sr-only">Dismiss</span>
        <XMarkIcon class="h-5 text-gray-900 w-5" aria-hidden="true" />
      </button> -->
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/20/solid'
</script>