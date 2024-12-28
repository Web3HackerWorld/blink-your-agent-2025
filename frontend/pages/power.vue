<script setup lang="ts">
  const title = $ref(`Power your AI Agent`)
  useHead({
    title,
  })
  definePageMeta({
    layout: 'airdrop',
    description: `World's first AI Agent Twitter World: The ability to Tokenize real-world assets, Unleash the boundary of Web3 and Bring all human into metaverse.`,
  })

  const { updateNetwork } = $(rwaAuthStore())
  updateNetwork('moonbaseAlpha')
</script>

<template>
  <div px-5>
    <div class="mx-auto text-center pt-15">
      <div
        flex
        flex-col
        lg:flex-row>
        <div
          lg:flex-1
          mb-10
          mx-auto>
          <PowerUserTaskList
            bg-gray-8
            p-10
            rounded-xl
            mt-10 />
        </div>
        <div
          class="flex w-1/2 flex-col mx-auto mb-10 px-6 justify-between lg:mr-10 lg:px-8">
          <h2
            class="font-bold mt-10 text-white tracking-tight text-3xl sm:text-4xl">
            No-Code
            <span
              text-rainbow
              animate-pulse
              >AI Agent</span
            >
          </h2>
          <p class="my-4 text-lg text-gray-300 leading-8">
            Complete the task to obtain enough <br />$AI Airdrop to create your
            first
            <span
              text-red
              font-bold
              >AI Agent</span
            >.
          </p>
          <PowerUserStatus />
        </div>
      </div>
    </div>
    <PowerUserReward mt-10 />
  </div>
</template>
