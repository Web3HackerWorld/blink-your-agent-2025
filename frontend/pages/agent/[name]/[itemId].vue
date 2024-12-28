<script setup lang="ts">
const tabs = [
  { name: 'Overview', href: '#', current: true },
  { name: 'Activity', href: '#', current: false },
  { name: 'Settings', href: '#', current: false },
  { name: 'Collaborators', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
]

const { address, readContract } = $(rwaAuthStore())

const { contentImg } = $(friendHelpSpotStore())

const { items, queryList, isLoading, queryAllActivity, getTokenId } = $(radarStore())

let tokenId = $ref('')

const route = useRoute()
const lineName = $computed(() => route.params.name)
const itemId = $computed(() => route.params.itemId)

let currentUserBalance = $ref(0n)
const updatePageStatus = async () => {
  await queryList({ tokenId, itemId })
  await queryAllActivity({ lineTokenId: tokenId, itemId })

  if (address) {
    currentUserBalance = await readContract('AIProtocol', 'balanceOf', {}, address, tokenId)
  }
}


const { updateNetwork } = $(rwaAuthStore())
updateNetwork('moonbaseAlpha')


onMounted(async () => {
  tokenId = await getTokenId({ lineName })
  await updatePageStatus()
})

const item = $computed(() => items[0])

const title = $computed(() => item?.metadata?.title)
definePageMeta({
  layout: 'airdrop',
  description: `World's first AI Agent Twitter World: The ability to Tokenize real-world assets, Unleash the boundary of Web3 and Bring all human into metaverse.`
})

</script>

<template>
  <div flex flex-col lg:flex-row justify-between bg-slate-900 mt-5 flex-1 mx-5 xl:mx-0>

    <Head>
      <Title>{{ title }}</Title>
    </Head>
    <main flex-1 text-gray-2>
      <BsLoading :isLoading="isLoading" text="Loading...">
        <div>
          <div v-if="contentImg(item)">
            <BsBoxImg :hasModal="true" :src="contentImg(item)" class="h-full object-cover" />
          </div>
          <div p-5 flex-bc>
            <BsTimeAgo :time="item?.created_at" class="text-sm pl-2 text-gray-4 whitespace-nowrap" />
            <div flex-cc>
              <span text-xs mr-2 text-white>{{ item?.income || '0' }}</span>
              <span i-cryptocurrency-btcp class="h-5 text-white w-5 group-hover:text-sky" aria-hidden="true" />
            </div>
          </div>
          <div leading-12 text-5xl text-center py-10 font-bold px-5>
            {{ item?.metadata?.title }}
          </div>
          <BsContent v-if="item?.tokenId" v-bind="item" :network="item?.network" :cb="updatePageStatus" :noBorder="true" px-5 />
        </div>
      </BsLoading>
    </main>
    <PowerAside />
  </div>
</template>

