<script setup lang="ts">
//  The more friend you help to join in, the more $AI you get.
const title = $ref('AI Agent Twitter World')
useHead({
  title,
})
definePageMeta({
  layout: 'airdrop',
  description: `World's first AI Agent Twitter World: The ability to Tokenize real-world assets, Unleash the boundary of Web3 and Bring all human into metaverse.`
})
</script>
<template>
  <div>
    <PowerHero mt-20 />
    <PowerStatus />
    <!-- <PowerTestimonials mt-20 /> -->

    <div class="mt-24 sm:mt-40 xl:mx-auto xl:max-w-7xl">
      <img src="https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?q=80&w=3552&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="object-cover w-full aspect-[5/2] xl:rounded-3xl" />
    </div>

    <PowerVip />
  </div>
</template>
