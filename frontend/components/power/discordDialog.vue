<script setup lang="ts">
interface Props {
  discordJoinLink: string
  show: boolean
  isLoading: boolean
  doClaim: Function
}
let {
  discordJoinLink,
  show = false,
  isLoading = false,
  doClaim,
} = defineProps<Props>()

const emit = defineEmits(['close'])

let onboardCode = $ref('')
const doSave = async () => {
  if (isLoading) return false
  const rz = await doClaim('bindDiscordAccount', {
    nonce: onboardCode,
  })
  if (!rz) return
  emit('close')
}

const isShowLinkInput = $ref(false)

</script>

<template>
  <BsDialogDefault :show="show" :no-padding="true" @close="$emit('close')">
    <div class="bg-lime-600 max-w-2xl py-6 px-3 shadow-2xl relative isolate overflow-hidden sm:rounded-3xl sm:px-12 xl:py-8">
      <h2 class="mx-auto my-10 text-white tracking-tight max-w-2xl text-2xl sm:text-3xl">
        1. Join HelloRWA Discord <br />
        2. Access "CreatorX/onboard" channel <br />
        3. Input "/creator-x-onboard" to get code
      </h2>
      <div flex-cc>
        <div flex flex-col items-center w-full>
          <a target="_blank" :href="discordJoinLink" @click="isShowLinkInput = true" class="bg-black rounded-full m-2 text-sm py-3 px-6 text-gray-100 inline-flex items-center hover:opacity-60" title="Click to tweet">
            <span i-ci-discord mr-1></span>
            Click to Join!
          </a>
          <BsLoading v-if="isShowLinkInput" :is-loading="isLoading">
            <div class="rounded-xl flex flex-col space-y-3 border-1 mt-10 w-full py-8 px-6">
              <input id="onboardCode" v-model="onboardCode" name="onboardCode" type="url" autocomplete="onboardCode" required="true" class="rounded-md bg-white/5 border-0 shadow-sm ring-inset text-white w-sm py-2 px-3.5 ring-1 ring-white/10 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-white focus:ring-2" placeholder="Enter your discord onboard code" />
              <button @click="doSave" class="bg-white rounded-md flex-none font-semibold shadow-sm text-sm py-2.5 px-3.5 text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-white focus-visible:outline-2 focus-visible:outline-offset-2">Submit</button>
            </div>
          </BsLoading>
          <div v-else text-gray-400 text-base pt-10 leading-6 text-xl>
            After you join and get "creator-x-onboard" code, <br />
            remember to copy the code back here!
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
