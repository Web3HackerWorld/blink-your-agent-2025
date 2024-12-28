<script setup lang="ts">
const { alertError, addSuccess } = $(notificationStore())
const { metadata, isLogin } = $(supabaseStore())
const { doLogin, update } = $(rwaAuthStore())
const { isShow, toggle, loadData } = $(airdropStore())

const airdropMeta = $(inject('airdropMeta'))

const season = $computed(() => airdropMeta.season)
const tags = $computed(() => airdropMeta.tags)
const text = $computed(() => airdropMeta.text)
const shareTweetStatusLink = $computed(() => airdropMeta.shareTweetStatusLink)

const route = useRoute();
onMounted(() => {
  if (route.query.showModal === 'yes') {
    toggle()
  }
})

let link = $ref('')
let walletAddress = $ref('')


const twitterShareBtnLink = $computed(() => {
  return `https://twitter.com/intent/tweet?text=${text}&url=${shareTweetStatusLink}&hashtags=${tags}`
})

const redirectPath = `${location.origin}${location.pathname}?showModal=yes`
update('redirectPath', redirectPath)

let isLoading = $ref(false)
let email = $ref('')
watchEffect(() => {
  if (metadata.email) {
    email = metadata.email
  }
})

const doSaveRetweetLink = async () => {
  if (!isEmail(email)) {
    return alertError('Your email is not validate!')
  }
  if (!isValidateAddress(walletAddress)) {
    return alertError('Wallet address is not validate!')
  }
  if (metadata?.user_name !== link.split('/')[3]) {
    return alertError('Twitter Handler and Retweet status link is not the same twitter account!')
  }

  isLoading = true
  const body = {
    link,
    email,
    walletAddress,
    type: 'reTweet',
    season,
  }

  const opts = {
    headers: useRequestHeaders(['cookie']),
    method: 'POST',
    body,
  }
  const { data } = $(await useFetch('/api/airdrop/shareLink', opts))

  switch (data.status) {
    case 201:
      toggle()
      addSuccess('Submit Succeed!')
      await loadData({ season })
      const ref = getLsItem('ref')
      const hasSaveRef = getLsItem('hasSaveRef', 'no')
      if (hasSaveRef !== 'yes' && ref) {
        await useFetch('/api/airdrop/updateRef', {
          headers: useRequestHeaders(['cookie']),
          method: 'POST',
          body: {
            ref,
          },
        })
        setLsItem('hasSaveRef', 'yes')
      }
      break
    case 409:
      console.error(data.error)
      alertError('Link already exist!')
      break;
    default:
      console.error(data.error)
      alertError(data.error.message || data.error)
      break;
  }

  isLoading = false
}

const isShowLinkInput = $ref(false)

</script>

<template>
  <BsDialogDefault :show="isShow" :no-padding="true" @close="toggle">
    <div class="bg-lime-600 max-w-2xl py-6 px-3 shadow-2xl relative isolate overflow-hidden sm:rounded-3xl sm:px-12 xl:py-8">
      <h2 class="font-bold mx-auto my-10 text-center text-white tracking-tight max-w-2xl text-3xl sm:text-4xl">Share your ref link, <br /> Claim {{ airdropMeta.amount }} $AI</h2>
      <!-- Click to Tweet! -->
      <div flex-cc>
        <BsBtnBlack v-if="!isLogin" @click="doLogin('twitter', toggle)" rounded-full>
          <span i-ci-twitter mr-1></span>
          Auth with Twitter
        </BsBtnBlack>
        <div v-else flex flex-col items-center w-full>
          <a target="_blank" :href="twitterShareBtnLink" @click="isShowLinkInput = true" class="bg-black rounded-full m-2 text-sm py-3 px-6 text-gray-100 inline-flex items-center hover:opacity-60" title="Click to tweet">
            <span i-ci-twitter mr-1></span>
            Click to Tweet!
          </a>
          <BsLoading v-if="isShowLinkInput" :is-loading="isLoading">
            <div class="rounded-xl flex flex-col space-y-3 border-1 mt-10 w-full py-8 px-6">
              <input id="email" v-model="email" v-if="!metadata.email" name="email" type="email" autocomplete="email" required="true" class="rounded-md bg-white/5 border-0 shadow-sm ring-inset text-white w-sm py-2 px-3.5 ring-1 ring-white/10 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-white focus:ring-2" placeholder="Enter your email address" />
              <input id="wallet-address" v-model="walletAddress" name="wallet-address" autocomplete="wallet-address" required="true" class="rounded-md bg-white/5 border-0 shadow-sm ring-inset text-white w-sm py-2 px-3.5 ring-1 ring-white/10 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-white focus:ring-2" placeholder="Enter your wallet address, eg: 0xf39fd6e...b92266" />
              <input id="tweet-status-link" v-model="link" name="tweet-status-link" type="url" autocomplete="tweet-status-link" required="true" class="rounded-md bg-white/5 border-0 shadow-sm ring-inset text-white w-sm py-2 px-3.5 ring-1 ring-white/10 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-white focus:ring-2" placeholder="Enter your tweet status link" />
              <button @click="doSaveRetweetLink" class="bg-white rounded-md flex-none font-semibold shadow-sm text-sm py-2.5 px-3.5 text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-white focus-visible:outline-2 focus-visible:outline-offset-2">Submit</button>
            </div>
          </BsLoading>
          <div v-else text-gray-400 text-base pt-10 leading-4>
            After you send out the tweet, <br />
            remember to copy the link back here!
          </div>
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
