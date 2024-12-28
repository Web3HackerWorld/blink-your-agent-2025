<script setup lang="ts">
import LineMdTwitterX from "~icons/line-md/twitter-x";
import RiExternalLinkLine from "~icons/ri/external-link-line";
import { nextTick } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";

const tabs = [
  { name: "Recent", href: "#", current: true },
  { name: "SBT", href: "#", current: false },
  { name: "NFT", href: "#", current: false },
];

let items = $ref([]);
const { doUpload } = $(supabaseStore());
const { addSuccess } = $(notificationStore());
const { isOpen, item, isLoading, contentImg, emptyItem, activityContent } = $(friendHelpSpotStore());
const { writeContract, readContract, address, network, appAddress } = $(rwaAuthStore());

const avatar = $computed(() => item?.metadata?.avatar);
const name = $computed(() => item?.metadata?.name);
const fullName = $computed(() => item?.metadata?.fullName);
const title = $computed(() => item?.metadata?.title);

let isLoadingBalance = $ref(false);
let randomLotterySellAmount = $ref(0);
const randomLotteryTokenId = $computed(() => item?.metadata?.randomLottery?.randomLotteryTokenId);
const randomLottery = $computed(() => item?.metadata?.randomLottery?.randomLotteryMetadata?.properties);
const nftGating = $computed(() => item?.metadata?.nftGating);
const sbtGating = $computed(() => item?.metadata?.sbtGating);
const sbtData = $computed(() => item?.metadata?.sbtData || {});
let sbtTotalSupply = $ref(0);
let isBuyingLottery = $ref(false);
let buyLotteryStatus = $ref("");
let otpBalance = $ref("");
let nftTotalSupply = $ref(0n);

// buyLotteryStatus = 'Uploading mint metadata to de-storage platform'
const distributor = import.meta.env.VITE_DISTRIBUTOR;
const querySupply = async () => {
  if (item?.tokenId) {
    nftTotalSupply = await readContract("AIProtocol", "totalSupply", {}, item?.tokenId);
  }
  if (randomLotteryTokenId) {
    randomLotterySellAmount = await readContract("AIProtocol", "totalSupply", {}, randomLotteryTokenId);
  }
  if (sbtGating) {
    const sbtTotalSupplyBN = await readContract("AIProtocol", "totalSupply", {}, sbtData.otpTokenId);
    sbtTotalSupply = sbtTotalSupplyBN.toString();

    if (address) {
      isLoadingBalance = true;
      otpBalance = await readContract("AIProtocol", "balanceOf", {}, address, sbtData.otpTokenId);
      isLoadingBalance = false;
    }
  }
};
const condition = $computed(() => usePick(item, ["tokenType", "itemId", "network", "appaddress"]));

let isActivityLoading = $ref(true);
const queryActivity = async () => {
  isActivityLoading = true;
  const { data, error } = $(
    await useGetRequest("/api/cache/activity", {
      ...condition,
      lineTokenId: item?.tokenId,
    })
  );
  if (error) {
    console.log("====> error :", error);
    return;
  }
  items = data;
  isActivityLoading = false;
};

const { queryList, queryAllActivity } = $(radarStore());

const updateSpotData = async () => {
  await querySupply();
  await queryActivity();
};
const updatePageStatus = async () => {
  await queryList();
  await updateSpotData();
  await queryAllActivity();
};

watchEffect(updateSpotData);

const buyLottery = async () => {
  if (isBuyingLottery) return;
  isBuyingLottery = true;

  const amount = 1;
  const payAmount = randomLottery.ticketPrice.toString();
  const payAmountInput = parseEther(payAmount);
  const spenderAddress = getContractAddress("AIProtocol", network);
  buyLotteryStatus = "Checking AI Allowance";
  const allowance = await readContract("AIEntropy", "allowance", {}, address, spenderAddress);
  if (allowance < payAmountInput) {
    buyLotteryStatus = "Waiting for approve AI spending";
    await writeContract("AIEntropy", "approve", {}, spenderAddress, payAmountInput);
  }

  buyLotteryStatus = "Uploading mint metadata to de-storage platform";
  const payTokenAddress = getContractAddress("AIEntropy", network);
  const metadata = {
    tokenData: randomLottery,
    randomLotteryTokenId,
    amount,
    payTokenAddress,
    payBy: address,
    distributor,
    avatar,
    name,
    fullName,
  };
  const { cid } = await doUpload(metadata);

  buyLotteryStatus = "Submiting data to blockchain";
  const rz = await writeContract("AIProtocol", "buyOTP", {}, randomLotteryTokenId, amount, cid, payTokenAddress, distributor);

  await usePost("/api/cache/activity", {
    ...condition,
    metadata,
    activityType: "buyRandomLottery",
    cid,
    lineTokenId: item?.tokenId,
    tokenId: randomLotteryTokenId,
  });
  await updatePageStatus();

  isBuyingLottery = false;
  buyLotteryStatus = "";

  addSuccess("Buy random lottery Succeed!");
};
const { showMintModal } = $(appStore());

const buySBT = () => {
  const data = {
    ...condition,
    amount: 1,
    tokenId: sbtData.otpTokenId,
    lineTokenId: item?.tokenId,
    network,
    metaType: "OTP",
    doClose: async (data) => {
      if (!data || !data.cid) return;

      nextTick(async () => {
        await usePost("/api/cache/activity", {
          lineTokenId: item?.tokenId,
          tokenId: sbtData.otpTokenId,
          appaddress: appAddress,
          ...condition,
          ...data,
          activityType: "buySBT",
        });
        await updatePageStatus();
      });
    },
  };
  showMintModal(data);
};
</script>
<template>
  <BsSlideOver v-model:isOpen="isOpen">
    <BsLoading :isLoading="isLoading" tb text="Loading..." class="bg-white flex flex-col h-full shadow-xl overflow-y-scroll">
      <div class="pb-6">
        <div class="flex py-6 px-5 relative items-center">
          <div class="flex-1 -m-1 p-1 block">
            <div class="inset-0 absolute" aria-hidden="true" />
            <div class="flex flex-1 min-w-0 relative items-center justify-between">
              <div flex items-center>
                <NuxtLink @click="isOpen = false" :to="`/agent/${name}/`" class="flex-shrink-0 relative inline-block">
                  <BsBoxImg class="rounded-full h-10 w-10" :src="avatar" alt="" />
                  <!-- <span :class="[item.status === 'online' ? 'bg-green-400' : 'bg-gray-300', 'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white']" aria-hidden="true" /> -->
                </NuxtLink>

                <div class="ml-4 truncate">
                  <a :href="`https://x.com/${name}`" target="_blank" class="flex-cc text-gray-500 group">
                    <LineMdTwitterX class="flex h-4 mr-1 w-4" />
                    <span>@{{ name }}</span>
                    <RiExternalLinkLine class="h-5 ml-1 w-5 hidden group-hover:flex" />
                  </a>
                </div>
              </div>
              <div text-right>
                <div text-sm text-rainbow>Market Value</div>
                <div flex items-center justify="end" space-x-1 text-xl font-bold>
                  <span mr-1>{{ numberFormat(nftTotalSupply * 100n) }}</span>
                  <span class="h-5 w-5 i-logos-bitcoin" />
                </div>
              </div>
            </div>
          </div>
          <Menu v-if="false" as="div" class="flex-shrink-0 text-left ml-2 relative inline-block">
            <MenuButton
              class="bg-white rounded-full h-8 w-8 group relative inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
            >
              <span class="-inset-1.5 absolute" />
              <span class="sr-only">Open options menu</span>
              <span class="rounded-full flex h-full w-full items-center justify-center">
                <EllipsisVerticalIcon class="h-5 text-gray-400 w-5 group-hover:text-gray-500" aria-hidden="true" />
              </span>
            </MenuButton>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="bg-white rounded-md shadow-lg ring-black origin-top-right top-0 right-9 ring-1 ring-opacity-5 w-48 z-10 absolute focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View profile</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Send message</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <div text-gray-8 px-4 sm:px-6>
          {{ title }}
          <div pt-5 v-if="contentImg(item)">
            <BsBoxImg :hasModal="true" :src="contentImg(item)" class="rounded-lg h-auto object-cover w-full max-h-50" />
          </div>
          <BsContent v-bind="item" :network="item?.network" :cb="updatePageStatus" />
        </div>
        <BsLoading v-if="randomLottery" tb :isLoading="isBuyingLottery" :text="buyLotteryStatus" class="px-4 flow-root sm:flex sm:px-6 sm:items-end">
          <div class="mt-6 sm:flex-1">
            <div
              class="rounded-lg flex flex-wrap space-y-1 bg-gray-2 mt-5 text-sm p-5 text-gray-5 justify-between items-center sm:(flex-row space-x-3 space-y-0)"
            >
              <div flex flex-col items-start w-auto>
                <div flex items-center justify="start" space-x-1 text-xl font-bold>
                  <span mr-1>{{ randomLottery.prizePool }}</span>
                  <span class="h-5 w-5 i-logos-bitcoin" />
                </div>
                <div text-sm>{{ randomLottery.winnerAmount }} Winners</div>
              </div>
              <div text-2xl font-bold>{{ randomLotterySellAmount }} / {{ randomLottery.ticketAmount }}</div>
              <div flex flex-col items-end justify-end w-auto space-y-1>
                <div flex font-bold>{{ randomLottery.ticketPrice }} $AI</div>
                <BsBtnIndigo class="py-1!" rounded-lg bg-sky hover:bg-sky-5 @click="buyLottery" :isLoading="isBuyingLottery">
                  Buy Ticket
                </BsBtnIndigo>
              </div>
            </div>
          </div>
        </BsLoading>
        <BsLoading v-if="sbtGating" tb :isLoading="isLoading" class="px-4 flow-root sm:flex sm:px-6 sm:items-end">
          <div class="mt-6 sm:flex-1">
            <div
              class="rounded-lg flex flex-wrap space-y-1 bg-gray-2 mt-5 text-sm p-5 text-gray-5 justify-between items-center sm:(flex-row space-x-3 space-y-0)"
            >
              <div flex flex-col items-start w-auto>
                <div flex items-center justify="start" space-x-1 text-xl font-bold>
                  <span mr-1>{{ numberFormat(sbtTotalSupply * sbtData.otpPrice) }}</span>
                  <span class="h-5 w-5 i-logos-bitcoin" />
                </div>
                <div text-sm>Total Earn</div>
              </div>
              <div text-2xl font-bold>{{ sbtTotalSupply }} / {{ sbtData.oneTimePaymentMaxSupply === 0 ? "∞" : sbtData.oneTimePaymentMaxSupply }}</div>
              <div flex flex-col items-end justify-end w-auto space-y-1>
                <div flex font-bold>{{ sbtData.otpPrice }} $AI</div>
                <div v-if="isLoadingBalance">Loading...</div>
                <div text-right v-else>
                  <div v-if="otpBalance > 0">You Owned: {{ otpBalance }}</div>
                  <BsBtnIndigo class="py-1!" rounded-lg bg-sky hover:bg-sky-5 @click="buySBT" :isLoading="isLoading" v-else> Buy </BsBtnIndigo>
                </div>
              </div>
            </div>
          </div>
        </BsLoading>
      </div>
      <div class="border-b border-gray-200 hidden">
        <div class="px-6">
          <nav class="flex -mb-px space-x-6">
            <a
              v-for="tab in tabs"
              :key="tab.name"
              :href="tab.href"
              :class="[
                tab.current ? 'border-lime-500 text-lime-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
              ]"
              >{{ tab.name }}</a
            >
          </nav>
        </div>
      </div>
      <BsLoading :isLoading="isActivityLoading" tb>
        <ul role="list" class="divide-y border-t divide-gray-200 border-gray-2 flex-1">
          <li v-for="item in items" :key="item.id">
            <div flex-bc py-4 px-5>
              <NuxtLink @click="isOpen = false" :to="`/agent/${item?.metadata?.name}/`" class="flex-shrink-0 relative inline-block">
                <BsBoxImg class="rounded-full h-10 w-10" :src="item?.metadata?.avatar" alt="" />
                <span
                  :class="[
                    item.status === 'online' ? 'bg-green-400' : 'bg-gray-300',
                    'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white',
                  ]"
                  aria-hidden="true"
                />
              </NuxtLink>
              <div h-full flex-1 pl-4>
                <div class="flex truncate">
                  <NuxtLink
                    @click="isOpen = false"
                    :to="`/agent/${item?.metadata?.name}/`"
                    class="text-sm text-gray-500 truncate hover:underline"
                  >
                    {{ "@" + item?.metadata?.name }}
                  </NuxtLink>
                </div>
                <div pt-2 text-gray-7>
                  {{ activityContent(item) }}
                </div>
              </div>
              <NuxtLink @click="isOpen = false" :to="`/agent/${item?.metadata?.name}/${item?.itemId}`" class="hover:underline">
                <BsTimeAgo :time="item.created_at" class="text-sm pr-2 text-gray-4 whitespace-nowrap" />
              </NuxtLink>
            </div>
          </li>
        </ul>
      </BsLoading>
    </BsLoading>
  </BsSlideOver>
</template>
