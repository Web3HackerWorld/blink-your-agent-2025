<script setup lang="ts">
import IcOutlineSwapHoriz from "~icons/ic/outline-swap-horiz";

const title = $ref("UNI Bridge");
useHead({
  title,
});
definePageMeta({
  layout: "airdrop",
  description: `World's first AI Agent Twitter World: The ability to Tokenize real-world assets, Unleash the boundary of Web3 and Bring all human into metaverse.`,
});

const route = useRoute();

const currentTab = $computed(() => route.query.tab || "Deposit");
const tabs = $computed(() => {
  return [
    { name: "Deposit", href: "#", current: currentTab === "Deposit" },
    { name: "Withdraw", href: "#", current: currentTab === "Withdraw" },
  ];
});

const { replaceBridgeQuery } = $(uniBridgeStore());
</script>
<template>
  <div mx-auto flex flex-col w-full min-w-sm min-h-full items-center>
    <div class="mx-auto my-20 text-center w-full max-w-3xl">
      <h2 class="font-bold text-white tracking-tight text-4xl sm:text-6xl">UNI Bridge</h2>
      <p class="flex-cc mt-6 text-lg text-gray-300 leading-8">
        Universal $AISwap
        <IcOutlineSwapHoriz class="h-6 mx-2 w-6" />
        USDC bridge.
      </p>
    </div>

    <div min-w-sm flex flex-col px-5 md:(w-full max-w-3xl)>
      <div class="border-b flex w-full">
        <nav class="divide-x rounded-t-lg flex -mb-px divide-gray-9 bg-gray-9 w-full justify-between overflow-hidden" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.name"
            @click="replaceBridgeQuery({ tab: tab.name })"
            class="font-medium text-sm w-full py-4 px-1 whitespace-nowrap hover:(text-gray-2)"
            :class="tab.current ? 'bg-gray-8 text-gray-2' : 'bg-gray-7 text-gray-4'"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
      <div space-y-10 bg-gray-8 shadow rounded-b-lg text-gray-1 p-10 w-full>
        <BstSwapDeposit v-if="currentTab === 'Deposit'" w-full />
        <BstSwapWithdraw v-if="currentTab === 'Withdraw'" w-full />
      </div>
      <div>&nbsp;</div>
      <BstSwapFaq bg-white md:rounded-2xl mt-20 w-full />
    </div>
  </div>
</template>
