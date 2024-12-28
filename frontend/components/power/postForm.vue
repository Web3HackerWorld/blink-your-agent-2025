<script setup lang="ts">
// TODO: https://vueup.github.io/vue-quill/
// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import MaterialSymbolsAddPhotoAlternateRounded from '~icons/material-symbols/add-photo-alternate-rounded'

const { doUpload } = $(supabaseStore())

const { avatar, fullName, name, userId } = $(supabaseStore())
const { address, readContract, writeContract, network,
  appaddress, web3Client } = $(rwaAuthStore())
const { addSuccess, alertSuccess, alertError } = $(notificationStore())
const { queryList } = $(radarStore())

let title = $ref('')
// title = 'Just create a new content on CreatorX!'
const postForm = ref()

let showImg = $ref(true)

const imgUploadFile = $ref(null)
let img = $ref('')
let imgUrl = $ref('')
const onImgUploadBtnClick = () => {
  imgUploadFile.click()
}
const onImgUploadFileChange = (event) => {
  showImg = true
  const files = event.target.files
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    imgUrl = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  img = files[0]
}

const removeImg = () => {
  // showImg = false
  img = ''
  imgUrl = ''
  imgUploadFile.value = ''
}

let showGating = $ref(false)
let lockedContent = $ref('Hello! This is my first NFT gating content on RWA-Wallet')
lockedContent = ''
let otpPrice = $ref('5')

let showLottery = $ref(false)
let ticketAmount = $ref(2)
let ticketPrice = $ref(1)
let winnerAmount = $ref(1)
let prizePool = $ref(223)
const income = $computed(() => (ticketPrice * ticketAmount) - prizePool)

const { tokenId } = $(friendHelpNFTStore())
const canSubmit = $computed(() => {
  if (!title) return false

  return true
})

let nftGating = $ref(false)
let sbtGating = $ref(false)

let isLoading = $ref(false)
let status = $ref('')

const inviteCommission = 100;
const oneTimePaymentMaxSupply = 0;

const doSubmit = async () => {
  if (!tokenId) {
    alertError('You need to collect 100 $AI and then create your CreatorX Line on Dashboard page first!', () => {
      navigateTo('/power')
    })
    return
  }
  if (!nftGating && !sbtGating) {
    alertError(`You should turn on NFT Gating or SBT Gating, or it's not necessary to post the content on the blockchain.`)
    return
  }

  if (isLoading) return
  isLoading = true
  status = 'Start posting your spot!'

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })

  const { cid: avatarCid } = await doUpload(avatar)
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl
  let metadata = {
    title,
    userAddress: address,
    userId,
    avatar: avatarCid,
    name,
    fullName,
    img: `${siteUrl}/logo.png` // put rwa logo here
  }
  // 1. Get image ipfs hash, but store onto supabase storage only
  if (img) {
    const { cid, url } = await doUpload(img)
    imgUrl = url
    metadata['img'] = cid
  }

  let condition = []
  let itemId = await readContract("AIProtocol", "getItemsCount", {}, tokenId, "")
  itemId = itemId.toString()
  if (nftGating || sbtGating) {
    status = "Start encrypting your content with NFT Gating";

    const { doEncryptedString, generateCondition } = litHelper(web3Client)
    const { address: contractAddress } = getContractInfo('AIProtocol')
    if (nftGating) {
      condition = generateCondition({ contractAddress, ownerAddress: address, tokenId, unlockAmount: 1 })
      metadata['nftGating'] = nftGating
      metadata['condition'] = condition
    }
    if (sbtGating) {
      status = "Start creating One Time Payment SBT";
      const sbtMetadata = {
        name: `OTP for ${title}`,
        description: `The one time payment SBT for ${title}`,
        image: metadata['img'],
        properties: {
          category: 'CreatorX',
          tokenType: "OTP",
          basicPrice: otpPrice,
          maxSupply: oneTimePaymentMaxSupply,
          itemId,
          tokenId,
        },
        external_url: `https://ai-agent-twitter.world/token/${tokenId}/${itemId}`,
      }
      const { cid: otpCid } = await doUpload(sbtMetadata);
      const { result } = await writeContract("AIProtocol", "addOTP", {},
        parseEther(otpPrice.toString()),
        inviteCommission,
        oneTimePaymentMaxSupply,
        otpCid,
        tokenId,
        itemId
      );

      const otpTokenId = result.toString();
      addSuccess("Create One Time Payment SBT Succeed!");
      const sbtGatingCondition = generateCondition({ contractAddress, ownerAddress: address, tokenId: otpTokenId, unlockAmount: 1 })
      if (nftGating) {
        condition = [
          ...condition,
          {
            operator: "or",
          },
          sbtGatingCondition[2],
        ]
      } else {
        condition = sbtGatingCondition
      }

      metadata = {
        ...metadata,
        condition,
        sbtGating,
        sbtData: {
          otpCid,
          otpTokenId,
          otpPrice,
          oneTimePaymentMaxSupply,
        }
      }
    }

    const encryptedData = await doEncryptedString(lockedContent, condition);
    metadata['encryptedData'] = encryptedData
    addSuccess("Encrypt your content with NFT Gating Succeed!");
  }

  if (showLottery) {
    const randomLotteryMetadata = {
      name: `Random Lottery for ${title}`,
      description: `The Random Lottery SBT for ${title}`,
      image: metadata['img'],
      properties: {
        ticketAmount,
        ticketPrice,
        winnerAmount,
        prizePool,
        category: 'CreatorX',
        tokenType: "RandomLottery",
        itemId,
        tokenId,
      },
      external_url: `https://ai-agent-twitter.world/token/${tokenId}/${itemId}`,
    }
    const { cid: randomLotteryCid } = await doUpload(randomLotteryMetadata);
    const { result } = await writeContract("AIProtocol", "addOTP", {},
      parseEther(ticketPrice.toString()),
      inviteCommission,
      ticketAmount,
      randomLotteryCid,
      tokenId,
      itemId
    );

    const randomLotteryTokenId = result.toString();
    metadata = {
      ...metadata,
      randomLottery: {
        randomLotteryTokenId,
        randomLotteryCid,
        randomLotteryMetadata,
      }
    }
    addSuccess("Create Random Lottery SBT Succeed!");
  }

  status = "Start storing your spot metadata on de-storage";
  const { cid: spotCid } = await doUpload(metadata);
  addSuccess("Store your spot metadata on de-storage Succeed!");

  status = "Start committing spot data onto blockchain";
  try {
    await writeContract("AIProtocol", "addItem", {}, "text", tokenId, spotCid);
  } catch (err) {
    console.log('====> err :', err)
    throw new Error(err)
  }

  addSuccess("Submit item data onto blockchain Succeed!");

  // testnet only
  status = 'Start cache spot data on api server'
  const cacheRz = $(await usePost('/api/cache/spot', {
    tokenId,
    tokenType: 'CreatorX',
    itemId,
    metadata,
    itemType: 'text',
    cid: spotCid,
    network,
    appaddress,
    lockedContentRaw: lockedContent // TODO: testnet only, for later we can help creator to sync data to mainnet via code
  }))

  addSuccess("Cache spot data on api server Succeed!");
  addSuccess("Create new Spot Succeed!");
  await queryList()
  showGating = false
  // showLottery = false
  title = ''
  // showImg = false
  img = ''
  imgUrl = ''
  isLoading = false
}
</script>

<template>
  <div class="flex space-x-4  mt-2 items-start " ref="postForm">
    <div class="flex-shrink-0">
      <img class="rounded-full h-10 w-10 inline-block" :src="avatar" alt="" />
    </div>
    <BsLoading :isLoading="isLoading" :text="status" class="flex-1 min-w-0 relative">
      <div class="space-y-10">
        <resize-textarea class="bg-transparent rounded-lg border-1 border-gray-6 text-white w-full block resize-none placeholder:text-gray-6 sm:text-sm sm:leading-6 p-5! focus:(border-lime-6 outline-none) " id="title" v-model="title" w-full placeholder="Write the title for your spot!" :rows="2" :cols="4" />

        <div v-if="showImg" class="cursor-pointer relative">
          <div class="col-span-full group" v-if="!imgUrl" @click="onImgUploadBtnClick">
            <label for="cover-photo" class="font-medium text-sm text-white leading-6 block">Cover Image</label>
            <div class="border border-dashed rounded-lg flex border-white/25 mt-2 py-10 px-6 justify-center group-hover:border-lime-500">
              <div class="text-center">
                <MaterialSymbolsAddPhotoAlternateRounded class="mx-auto h-12 text-gray-500 w-12 group-hover:text-lime-500" aria-hidden="true" />
                <div class="flex mt-4 text-sm text-gray-400 leading-6">
                  <label for="file-upload" class="rounded-md cursor-pointer font-semibold bg-gray-900 text-gray-500 relative focus-within:outline-none focus-within:ring-2 focus-within:ring-lime-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 group-hover:text-lime-500">
                    <span>click to Upload an image</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <img :src="imgUrl" class="rounded-2xl" @click="onImgUploadBtnClick" />
          <button v-if="imgUrl" @click="removeImg" class="rounded-full bg-gray-8 p-2 -top-3 -right-3 absolute">
            <span class=" flex h-4 text-white w-4 i-ic-twotone-close" />
          </button>
        </div>

        <div v-if="showGating" mt-10 class="rounded-lg shadow-sm ring-inset p-5 ring-1 ring-gray-6 relative focus-within:ring-1 focus-within:ring-lime-600">
          <button @click="showGating = false" class="rounded-full bg-gray-8 p-2 -top-3 -right-3 absolute">
            <span class=" flex h-4 text-gray-6 w-4 i-ic-twotone-close" />
          </button>
          <div flex-cy space-x-2 class="bg-slate-9 px-2 -top-3 left-5 text-gray-6 absolute">
            <span>Gating Setup</span>
            <!-- <span class="h-4 w-4 i-ic-sharp-help" /> -->
          </div>
          <resize-textarea class="bg-transparent mt-5 text-white w-full block resize-none placeholder:text-gray-6 sm:text-sm sm:leading-6 p-0! focus:(ring-0 outline-none) " id="lockedContent" v-model="lockedContent" w-full placeholder="Your crypto gating content here" :rows="2" :cols="4" />

          <div border-t-gray border-t-1 mt-5 space-y-5 py-5>
            <BsFormToggle title="NFT Gating" v-model="nftGating">
              <span v-show="nftGating">Your line NFT holder can unlock</span>
            </BsFormToggle>
            <BsFormToggle title="SBT Gating" v-model="sbtGating">
              <div v-show="sbtGating" flex items-center>
                <span mr-2>One Time Payment with</span>
                <input type="text" name="otpPrice" id="otpPrice" class="bg-transparent outline-none border-0 border-b-1 text-center w-8" v-model="otpPrice" />
                <!-- <span class="h-4 w-4 i-logos-bitcoin" /> -->
                $AI
              </div>
            </BsFormToggle>
          </div>
        </div>

        <div v-if="showLottery" mt-10 class="rounded-lg shadow-sm ring-inset p-5 ring-1 ring-gray-6 text-gray-6 relative focus-within:ring-1 focus-within:ring-lime-600">
          <button @click="showLottery = false" class="rounded-full bg-gray-8 p-2 -top-3 -right-3 absolute">
            <span class=" flex h-4 text-gray-6 w-4 i-ic-twotone-close" />
          </button>
          <div flex-cy space-x-2 class="bg-slate-9 px-2 -top-3 left-5 absolute">
            <span>Random Lottery</span>
            <!-- <span class="h-4 w-4 i-ic-sharp-help" /> -->
          </div>
          <div space-y-8 py-5>
            <div flex-bc>
              <div flex-cc focus-within:text-gray-200 space-x-2>
                <label for="ticketAmount">Ticket amount</label>
                <input type="text" name="ticketAmount" id="ticketAmount" class="bg-transparent border-b outline-none border-b-gray-6 text-center w-10" v-model="ticketAmount" @keypress="keypressIsNumber($event)" />
              </div>
              <div flex-cc focus-within:text-gray-200 space-x-2>
                <label for="ticketPrice">Ticket Price</label>
                <input @keypress="keypressIsNumber($event)" type="text" name="ticketPrice" id="ticketPrice" class="bg-transparent border-b outline-none border-b-gray-6 text-center w-10" v-model="ticketPrice" />
                <!-- <span class="h-4 w-4 i-logos-bitcoin" /> -->
                $AI
              </div>
            </div>
            <div flex-bc>
              <div flex-cc focus-within:text-gray-200 space-x-2>
                <label for="winnerAmount">Winner amount</label>
                <input @keypress="keypressIsNumber($event)" type="text" name="winnerAmount" id="winnerAmount" class="bg-transparent border-b outline-none border-b-gray-6 text-center w-10" v-model="winnerAmount" />
              </div>

              <div flex-cc focus-within:text-gray-200 space-x-2>
                <label for="prizePool">Prize pool</label>
                <input type="text" name="prizePool" id="prizePool" class="bg-transparent border-b outline-none border-b-gray-6 text-center w-10 focus:border-b-gray-2" v-model="prizePool" @keypress="keypressIsNumber($event)" />
                <!-- <span class="h-4 w-4 i-logos-bitcoin" /> -->
                $AI
              </div>
            </div>
            <div border-t border-t-gray-6 pt-5 space-y-2>
              <div flex-ec>
                You need to invest <span px-2>=</span> <span text-gray-4>{{ prizePool }}</span>
                <!-- <span class="h-4 ml-2 w-4 i-logos-bitcoin" /> -->
                <span ml-2> $AI</span>
              </div>
              <div flex-ec>
                Income: {{ ticketPrice }} * {{ ticketAmount }} <span px-2>=</span> <span text-gray-4>{{ ticketPrice * ticketAmount }}</span>
                <!-- <span class="h-4 ml-2 w-4 i-logos-bitcoin" /> -->
                <span ml-2> $AI</span>
              </div>
              <div flex-ec>
                Profit: {{ ticketPrice * ticketAmount }} - {{ prizePool }} <span px-2>=</span> <span text-gray-4>{{ income }}</span>
                <!-- <span class="h-4 ml-2 w-4 i-logos-bitcoin" /> -->
                <span ml-2> $AI</span>
              </div>
              <CircleWallet title="Lottery vault" :requiredBst="prizePool" />
            </div>
          </div>
        </div>
        <!-- Spacer element to match the height of the toolbar -->
        <div class="py-2" aria-hidden="true">
          <!-- Matches height of button in toolbar (1px border + 36px content height) -->
          <div class="py-px">
            <div class="h-6" />
          </div>
        </div>
      </div>

      <div class="flex py-2 pr-2 pl-3 inset-x-0 bottom-0 absolute justify-between">
        <div class="flex space-x-5 items-center">
          <div class="flex space-x-1 justify-start items-center">
            <button type="button" @click="showImg = !showImg" :class="showImg ? 'text-gray-300' : ''" class="rounded-full flex h-8 text-gray-500 w-8 items-center justify-center hover:text-gray-100">
              <span class="h-5 w-5 i-material-symbols-imagesmode" aria-hidden="true" />
              <span class="sr-only">Attach a image</span>
            </button>
            <button @click="showGating = !showGating" type="button" :class="showGating ? 'text-gray-300' : ''" class="rounded-full flex h-8 text-gray-500 w-8 items-center justify-center hover:text-gray-100">
              <span class="h-5 w-5 i-carbon-gateway-vpn" aria-hidden="true" />
              <span class="sr-only">Gating setup</span>
            </button>
            <button v-if="false" @click="showLottery = !showLottery" type="button" :class="showLottery ? 'text-gray-300' : ''" class="rounded-full flex h-8 text-gray-500 w-8 items-center justify-center hover:text-gray-100">
              <span class="h-5 w-5 i-fluent-lottery-24-regular" aria-hidden="true" />
              <span class="sr-only">Random Lottery</span>
            </button>
          </div>
        </div>
        <div class="flex-shrink-0">
          <BsBtnIndigo @click="doSubmit" :disabled="!canSubmit">Post</BsBtnIndigo>
        </div>
      </div>
      <!-- </div> -->
    </BsLoading>
    <input ref="imgUploadFile" type="file" hidden accept="image/*" @change="onImgUploadFileChange" />
  </div>
</template>
