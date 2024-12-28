<script setup lang="ts">
import { optimismGoerli, avalancheFuji, polygonAmoy, mainnet, optimism, arbitrum, polygon, bsc, base, sepolia } from "viem/chains";
import IcOutlineSwapHoriz from "~icons/ic/outline-swap-horiz";

const title = $ref("$AI");
useHead({
  title,
});
definePageMeta({
  layout: "airdrop",
  description: `AI Agent Twitter World.`,
});

const chainMap = {
  // mainnet, optimism, arbitrum, polygon, bsc, base
  polygonAmoy,
  sepolia,
};
const chainList = $ref(useMap(chainMap, (item) => item.name));
let sourceChainName = $ref(chainList[0]);
const sourceChain = $computed(() => {
  const rz = useFilter(chainMap, (item) => item.name === sourceChainName);
  return rz[0];
});

const { updateNetwork } = $(rwaAuthStore());
updateNetwork("moonbaseAlpha");

let action = $ref("deposit");
const toggleAction = () => {
  if (action === "deposit") {
    action = "withdraw";
    return;
  }
  action = "deposit";
};
let currentTab = $ref("Deposit");
const tabs = $computed(() => {
  return [
    { name: "Deposit", href: "#", current: currentTab === "Deposit" },
    { name: "Withdraw", href: "#", current: currentTab === "Withdraw" },
  ];
});

const route = useRoute();

watchEffect(() => {
  if (route.query.tab) {
    currentTab = route.query.tab;
  }
});

const goTo = async (tab) => {
  return navigateTo({
    path: "/ai",
    query: {
      tab,
    },
  });
};
</script>
<template>
  <div mx-auto flex flex-col w-full min-w-xl min-h-full items-center>
    <!-- <BstSwapStatus my-10 /> -->
    <div class="mx-auto my-20 text-center max-w-2xl">
      <h2 class="font-bold text-white tracking-tight text-4xl sm:text-6xl">$AI Bridge</h2>
      <p class="flex-cc mt-6 text-lg text-gray-300 leading-8">
        Universal $AISwap
        <IcOutlineSwapHoriz class="h-6 mx-2 w-6" />
        USDC bridge.
      </p>
    </div>

    <div min-w-3xl flex flex-col px-5>
      <div class="border-b flex w-full">
        <nav class="divide-x rounded-t-lg flex -mb-px divide-gray-9 bg-gray-9 w-full justify-between overflow-hidden" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.name"
            @click="goTo(tab.name)"
            class="font-medium text-sm w-full py-4 px-1 whitespace-nowrap hover:(text-gray-2)"
            :class="tab.current ? 'bg-gray-8 text-gray-2' : 'bg-gray-7 text-gray-4'"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
      <div space-y-10 bg-gray-8 shadow rounded-b-lg text-gray-1 p-10 w-full>
        <BstSwapDeposit @toggle="goTo('Withdraw')" v-if="currentTab === 'Deposit'" w-full />
        <BstSwapWithdraw @toggle="goTo('Deposit')" v-if="currentTab === 'Withdraw'" w-full />
      </div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>
