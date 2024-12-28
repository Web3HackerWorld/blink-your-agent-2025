<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid'

const tiers = [
  {
    name: '1 Year SBT',
    id: 'tier-freelancer',
    href: 'https://x.com/Web3HackerWorld',
    price: '0.1 ETH',
    priceSuffix: 'Unlimited',
    description: 'Cheap but can not re-sell',
    features: [
      '1 Year Life Time',
      'SBT: Can not re-sell',
      '1000 $AIEntropty inside',
    ],
    mostPopular: false,
  },
  {
    name: '5 Year NFT',
    id: 'tier-startup',
    href: 'https://x.com/Web3HackerWorld',
    price: '0.5 ETH',
    priceSuffix: '10K Supply',
    description: 'Great and exchangeable!',
    features: [
      '5 year life time',
      'Re-sell at any NFT market',
      'Early access to beta features',
      '10000 $AIEntropty inside',
      'Unknown gift',
    ],
    mostPopular: true,
  },
  {
    name: 'Forever SVIP',
    id: 'tier-enterprise',
    href: 'https://x.com/Web3HackerWorld',
    price: '5 ETH',
    priceSuffix: '500 Supply',
    description: 'SBT with super power',
    features: [
      'Life time forever(till we die)',
      'SBT: Can not re-sell',
      'Early access to beta features',
      '10000 $AIEntropty airdrop per year',
      'Unknown gift',
      'Unknown benifit',
    ],
    mostPopular: false,
  },
]

const isHighlight = feature => {
  return [
    '10000 $AIEntropty inside',
    '10000 $AIEntropty airdrop per year',
    'Unknown gift',
    'Unknown benifit'
  ].includes(feature)
}

</script>
<template>
  <div class="mx-auto px-6 pt-10 lg:px-8 lg:pt-16">
    <div class="mx-auto my-20 text-center">
      <h2 class="font-semibold text-base text-lime-400 leading-7">VIP NFT</h2>
      <p class="font-bold mt-10 text-white tracking-tight text-4xl sm:text-5xl">Get <span text-rainbow animate-pulse inline-block>Pre-Reserve</span> now</p>
    </div>
    <p class="mx-auto mt-6 text-center text-lg text-gray-300 leading-8">
      AI Agent Twitter currently in beta testnet,
      will launch mainnet soon with VIP membership,<br />
      once you become our VIP NFT holders,
      you can access AI Agent Twitter mainnet while it launched.
    </p>
    <div class="mx-auto max-w-md my-30 mt-40 grid gap-8 grid-cols-1 isolate lg:max-w-none lg:mx-0 lg:grid-cols-3">
      <div class="transform-gpu  transition-all ease-linear hover:(scale-110 animate-pulse bg-white/5 ring-2 ring-lime-500 ) " v-for="tier in tiers" :key="tier.id" :class="[tier.mostPopular ? 'bg-white/5 ring-2 ring-lime-500' : 'ring-1 ring-white/10', 'rounded-3xl p-8 xl:p-10']">
        <div class="flex gap-x-4 items-center justify-between">
          <h3 :id="tier.id" class="font-semibold text-lg text-white leading-8">{{ tier.name }}</h3>
          <p v-if="tier.mostPopular" class="rounded-full font-semibold bg-lime-500 text-xs text-white py-1 px-2.5 leading-5">Most popular</p>
        </div>
        <p class="mt-4 text-sm text-gray-300 leading-6">{{ tier.description }}</p>
        <p class="flex mt-6 gap-x-1 items-baseline">
          <span class="font-bold text-white tracking-tight text-4xl">{{ tier.price }}</span>
          <span class="font-semibold text-sm text-gray-300 leading-6"> {{ tier.priceSuffix }}</span>
        </p>
        <a :href="tier.href" target="_blank" :aria-describedby="tier.id" :class="[tier.mostPopular ? 'bg-lime-500 text-white shadow-sm hover:bg-lime-400 focus-visible:outline-lime-500' : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white', 'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2']">Buy plan</a>
        <ul role="list" class="space-y-3 mt-8 text-sm text-gray-300 leading-6 xl:mt-10">
          <li v-for="feature in tier.features" :key="feature" class="flex gap-x-3">
            <CheckIcon class="flex-none h-6 text-white w-5" aria-hidden="true" />
            <span :class="isHighlight(feature) ? 'text-rainbow' : ''">{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
