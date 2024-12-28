<script setup lang="ts">
const router = useRouter()


useHead({
  title: 'Nothing Here',
})
definePageMeta({
  layout: 'airdrop',
  description: `World's first AI Agent Twitter World: The ability to Tokenize real-world assets, Unleash the boundary of Web3 and Bring all human into metaverse.`
})
</script>

<template>
  <main class="my-auto grid py-24 px-6 place-items-center sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="font-semibold text-base text-lime-600">404</p>
      <h1 class="font-bold mt-4 text-white tracking-tight text-3xl sm:text-5xl">Page not found</h1>
      <p class="mt-6 text-base text-gray-4 leading-7">Sorry, we couldn’t find the page you’re looking for.</p>
      <div class="flex mt-10 gap-x-6 items-center justify-center">
        <NuxtLink to="/" class="rounded-md font-semibold bg-lime-600 shadow-sm text-sm text-white py-2.5 px-3.5 hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">Go back home</NuxtLink>
        <a href="https://t.me/+m1ALbCk73_01ZjRl" target="_blank" class="font-semibold text-sm text-gray-400">Contact support <span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </main>
</template>
