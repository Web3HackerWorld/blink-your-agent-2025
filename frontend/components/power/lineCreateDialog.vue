<script setup lang="ts">

interface Props {
  show: boolean
}
let {
  show = false,
} = defineProps<Props>()

const { writeContract, network, address, readContract, appaddress } = $(rwaAuthStore())
const { name, avatar, userId, doUpload } = $(supabaseStore())
const { addSuccess, alertError } = $(notificationStore())
const { queryToken } = $(friendHelpNFTStore())

let isLoading = $ref(false)
let status = $ref('')

const updateBuilder = async (cid) => {
  const refUserName = getLsItem('ref', false)
  if (!refUserName) return

  const { data: refUserAddressData } = $(await useGetRequest('/api/bs/web3/refUserAddress', { name: refUserName, network, appAddress: appaddress }))
  if (refUserAddressData && refUserAddressData.address) {
    const rz = await writeContract('AIProtocol', 'updateBuidler', {}, refUserAddressData.address, cid)
    console.log(`====> updateBuidler rz :`, rz)
  }
}

const doSubmit = async () => {
  if (isLoading) return false
  isLoading = true

  const { address: payTokenAddress } = getContractInfo('AIEntropy')
  const { address: appaddress } = getContractInfo('AIProtocol')
  const bstPayAmount = parseEther('100').toString()
  const allowance = await readContract('AIEntropy', 'allowance', {}, address, appaddress)
  if (allowance < bstPayAmount) {
    await writeContract('AIEntropy', 'approve', {}, appaddress, bstPayAmount)
  }

  const basicPrice = parseEther('100').toString()
  const inviteCommission = 100
  const maxSupply = 10000
  const tokenType = 'CreatorX'
  const { cid: image } = await doUpload(avatar)
  const params = {
    userAddress: address,
    userId,
    name,
    description: `${name}'s CreatorX Line`,
    image,
    category: 'CreatorX',
    tags: [],
    tokenType,
    distributor: import.meta.env.VITE_DISTRIBUTOR,
    basicPrice,
    maxSupply,
    inviteCommission,
  }
  const properties = usePick(params, [
    "category",
    "tags",
    "tokenType",
    "distributor",
    "basicPrice",
    "maxSupply",
    "inviteCommission",
    "tierArr",
    "links",
  ]);
  const external_url = "";
  const metadata = {
    ...usePick(params, ["name", "description", "image"]),
    properties,
    external_url,
  };
  status = "upload to decentralized storage";
  const { cid } = await doUpload(metadata)

  await updateBuilder(cid)

  const args = [
    'FHF',
    basicPrice,
    inviteCommission,
    maxSupply,
    cid,
    payTokenAddress
  ]

  status = "create new NFT on RWA Protocol";

  try {
    const { tx, result: tokenId } = await writeContract('AIProtocol', 'addToken', {}, ...args)
    const { data, error } = $(await usePost('/api/cache/token', {
      tokenId: tokenId.toString(),
      tokenType,
      cid,
      metadata,
      network,
      appaddress,
    }))
    if (!error) {
      await queryToken()
      addSuccess('Create Line Succeed!')
      navigateTo('/agent')
    } else {
      console.log('====> error :', error)
    }
  } catch (e) {
    console.log(`====> e :`, e)
    alertError('$AI not enough!')
  }

  isLoading = false

}

</script>

<template>
  <BsDialogDefault :show="show" :no-padding="true" @close="$emit('close')">
    <div class="bg-lime-600 max-w-2xl py-6 px-3 shadow-2xl relative isolate overflow-hidden sm:rounded-3xl sm:px-12 xl:py-8">
      <h2 class="mx-auto my-10 text-white text-xl tracking-tight max-w-2xl">
        1. This will cost you <span text-red>100</span> $AI <br />
        2. It will bind your twitter account's avatar and user name <br />
      </h2>
      <div flex-cc>
        <div flex flex-col items-center w-full>
          <BsLoading :is-loading="isLoading" :text="status">
            <button @click="doSubmit" class="bg-black rounded-md flex-none font-semibold shadow-sm text-white text-sm py-2.5 px-3.5  hover:bg-gray-800 focus-visible:outline focus-visible:outline-white focus-visible:outline-2 focus-visible:outline-offset-2">Create My First Line now!</button>
          </BsLoading>
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
