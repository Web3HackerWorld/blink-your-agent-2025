<script setup lang="ts">
  import { CheckIcon } from '@heroicons/vue/20/solid'

  const { alertError, addSuccess } = $(notificationStore())
  const {
    myClaimData,
    steps,
    discordJoinLink,
    getMyClaim,
    isStatus,
    loadRewardItems,
  } = $(taskStore())
  let { season, currentStep } = $(taskStore())
  season = 'ai-agent-s1'

  const retweetData = $ref({
    season,
    amount: 30,
    tags: 'RWAWallet,Airdrop,CreatorX',
    text: `Just Get 30 $AI via %link%, Follow @HelloRWA and RT, LIKE, @ 3 of your friends to get yours`,
    retweetLink: 'https://twitter.com/Web3HackerWorld/status/1867858591937605846',
  })

  const { name, isLogin, avatar, updateUserRef } = $(supabaseStore())
  const { toggle: showLoginModal, update: updateMeta } = $(rwaAuthStore())
  let { toggle: toggleFollowModal, isLoading: isFollowLoading } = $(
    followStore()
  )

  const redirectPath = `${location.origin}${location.pathname}`
  updateMeta('redirectPath', redirectPath)

  let isIniting = $ref(false)
  let isLoading = $ref(false)
  let isShowRetweet = $ref(false)
  let isShowDiscord = $ref(false)
  let isShowInvite = $ref(false)

  watchEffect(async () => {
    if (!isLogin || isIniting) return
    isIniting = true
    // await getMyClaim()
    console.log('isIniting', isIniting)
    isIniting = false
  })

  watchEffect(async () => {
    if (!isLogin) return
    if (currentStep === 1) currentStep += 1

    if (
      currentStep === 2 &&
      useGet(myClaimData, 'followOfficeAccount.status') === 'waitForVerify'
    ) {
      currentStep = 3
    }

    if (
      currentStep === 3 &&
      useGet(myClaimData, 'retweetAndLike.status') === 'waitForVerify'
    ) {
      currentStep = 4
    }
    if (
      currentStep === 4 &&
      ['waitForCollect', 'collected'].includes(
        useGet(myClaimData, 'bindDiscordAccount.status')
      )
    ) {
      currentStep = 5
    }
    if (
      currentStep === 5 &&
      ['waitForCollect', 'collected'].includes(
        useGet(myClaimData, 'inviteOneMoreFriend.status')
      )
    ) {
      currentStep = 6
    }
  })

  const doClaim = async (action, meta = {}) => {
    if (isLoading) return

    isLoading = true
    const body = {
      action,
      season,
      meta,
    }
    const opts = {
      headers: useRequestHeaders(['cookie']),
      method: 'POST',
      body,
    }
    const { data } = $(await useFetch('/api/airdrop/claim', opts))
    switch (data.status) {
      case 201:
        addSuccess('Submit claim Succeed!')
        await getMyClaim()
        await loadRewardItems(season)
        await updateUserRef()
        isLoading = false
        return true
        break
      case 409:
        console.error(data.error)
        alertError('Already Claim!')
        break
      default:
        console.error(data.error)
        alertError(data.error.message || data.error)
    }
    isLoading = false
  }

  const doSubmitFollowRewardClaim = async () => {
    isFollowLoading = true
    await doClaim('followOfficeAccount')
    await loadRewardItems(season)
    isFollowLoading = false
    toggleFollowModal('', '')
    // currentStep += 1
  }
</script>

<template>
  <div>
    <BsLoading
      :is-loading="isIniting"
      min-w-sm
      text-white>
      <ol
        role="list"
        class="text-left overflow-hidden">
        <li
          v-for="(step, stepIdx) in steps"
          :key="step.name"
          :class="[stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative']">
          <template v-if="step.status === 'current'">
            <div
              v-if="stepIdx !== steps.length - 1"
              class="h-full -ml-px bg-gray-300 mt-0.5 top-4 left-4 w-0.5 absolute"
              aria-hidden="true" />
            <div
              class="flex group relative items-start"
              aria-current="step">
              <span
                class="flex h-9 items-center"
                aria-hidden="true">
                <span
                  class="bg-white rounded-full flex border-2 border-lime-600 h-8 w-8 z-10 relative items-center justify-center">
                  <span class="rounded-full bg-lime-600 h-2.5 w-2.5" />
                </span>
              </span>
              <div class="flex flex-col ml-4 w-full min-w-0">
                <span class="font-medium text-sm mb-5 text-lime-600">{{
                  step.name
                }}</span>
                <div
                  flex
                  items-center
                  justify="between"
                  w-full>
                  <BsBtnIndigo
                    v-if="step.step === 'connectToX'"
                    rounded-lg
                    @click="showLoginModal"
                    >Connect</BsBtnIndigo
                  >
                  <BsBtnIndigo
                    :isLoading="isLoading"
                    v-if="step.step === 'followOfficeAccount'"
                    rounded-lg
                    @click="
                      toggleFollowModal(step.link, doSubmitFollowRewardClaim)
                    "
                    >Follow Now</BsBtnIndigo
                  >
                  <BsBtnIndigo
                    :isLoading="isLoading"
                    v-if="step.step === 'retweetAndLike'"
                    rounded-lg
                    @click="isShowRetweet = true"
                    >Go for Retweet and Like</BsBtnIndigo
                  >
                  <BsBtnIndigo
                    :isLoading="isLoading"
                    v-if="step.step === 'bindDiscordAccount'"
                    rounded-lg
                    @click="isShowDiscord = true">
                    Bind discord account
                  </BsBtnIndigo>
                  <BsBtnIndigo
                    :isLoading="isLoading"
                    rounded-lg
                    @click="isShowInvite = true"
                    v-if="step.step === 'inviteOneMoreFriend'">
                    Invite now!
                  </BsBtnIndigo>
                  <div
                    flex
                    items-center
                    text-white>
                    <span mr-2>{{ step.amount }}</span>
                    <span class="h-5 w-5 i-logos-bitcoin" />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else-if="step.status === 'complete'">
            <div
              v-if="stepIdx !== steps.length - 1"
              class="h-full -ml-px bg-lime-600 mt-0.5 top-4 left-4 w-0.5 absolute"
              aria-hidden="true" />
            <div class="flex group relative items-start">
              <span
                class="flex h-9 items-center"
                v-if="isStatus(step, 'waitForVerify')">
                <span
                  class="rounded-full flex bg-lime-600 h-8 w-8 z-10 relative items-center justify-center group-hover:bg-lime-800">
                  <CheckIcon
                    class="h-5 text-white w-5"
                    aria-hidden="true" />
                </span>
              </span>
              <span
                class="flex h-9 items-center"
                v-else-if="isStatus(step, 'collected')">
                <span
                  class="rounded-full flex bg-green-600 h-8 w-8 z-10 relative items-center justify-center group-hover:bg-green-800">
                  <CheckIcon
                    class="h-5 text-white w-5"
                    aria-hidden="true" />
                </span>
              </span>
              <span
                v-else-if="isStatus(step, 'waitForCollect')"
                class="flex h-9 items-center"
                aria-hidden="true">
                <span
                  class="bg-white rounded-full flex border-2 border-green-600 h-8 w-8 z-10 relative items-center justify-center">
                  <span class="rounded-full bg-green-600 h-2.5 w-2.5" />
                </span>
              </span>
              <span
                v-else
                class="flex h-9 items-center"
                aria-hidden="true">
                <span
                  class="bg-white rounded-full flex border-2 border-green-600 h-8 w-8 z-10 relative items-center justify-center">
                  <span class="rounded-full bg-green-600 h-2.5 w-2.5" />
                </span>
              </span>
              <span class="flex flex-col text-white ml-4 min-w-0 w-full">
                <span class="font-medium text-sm">{{ step.name }}</span>
                <template v-if="step.step === 'connectToX'">
                  <div
                    flex
                    items-center
                    justify="between"
                    w-full
                    pt-2>
                    <a
                      flex
                      items-center
                      target="_blank"
                      :href="`https://Twitter.com/${name}`">
                      <img
                        class="rounded-full h-8 mr-2 w-8"
                        :src="avatar"
                        alt="" />
                      {{ name }}
                    </a>
                    <div
                      v-if="isStatus(step, ['waitForCollect', 'collected'])"
                      flex
                      items-center>
                      <span mr-2>{{ myClaimData[step.step].amount }}</span>
                      <span class="h-5 w-5 i-logos-bitcoin" />
                    </div>
                    <BsBtnIndigo
                      v-else
                      rounded-lg
                      @click="doClaim(step.step)"
                      :isLoading="isLoading"
                      >Claim</BsBtnIndigo
                    >
                  </div>
                </template>
                <template v-else-if="step.step === 'followOfficeAccount'">
                  <div
                    flex
                    items-center
                    justify="between"
                    w-full
                    pt-2>
                    <a
                      :href="step.link"
                      target="_blank"
                      class="underline hover:text-blue-500">
                      Wait for verify
                    </a>
                    <div
                      flex
                      items-center>
                      <span mr-2>{{ myClaimData[step.step].amount }}</span>
                      <span class="h-5 w-5 i-logos-bitcoin" />
                    </div>
                  </div>
                </template>
                <template v-else-if="step.step === 'retweetAndLike'">
                  <div
                    flex
                    items-center
                    justify="between"
                    w-full
                    pt-2>
                    <a
                      :href="myClaimData[step.step]?.meta?.link"
                      target="_blank"
                      class="underline hover:text-blue-500">
                      Wait for verify
                    </a>
                    <div
                      flex
                      items-center>
                      <span mr-2>{{ myClaimData[step.step]?.amount }}</span>
                      <span class="h-5 w-5 i-logos-bitcoin" />
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div
                    flex
                    items-center
                    justify="between"
                    w-full
                    pt-2>
                    <div>
                      {{
                        isStatus(step, 'waitForCollect')
                          ? 'Wait for collect'
                          : ''
                      }}
                      {{ isStatus(step, 'collected') ? 'Collected' : '' }}
                    </div>
                    <div
                      flex
                      items-center>
                      <span mr-2>{{ myClaimData[step.step].amount }}</span>
                      <span class="h-5 w-5 i-logos-bitcoin" />
                    </div>
                  </div>
                </template>
              </span>
            </div>
          </template>
          <template v-else>
            <div
              v-if="stepIdx !== steps.length - 1"
              class="h-full -ml-px bg-gray-300 mt-0.5 top-4 left-4 w-0.5 absolute"
              aria-hidden="true" />
            <div class="flex group relative items-start">
              <div
                class="flex h-9 items-center"
                aria-hidden="true">
                <span
                  class="bg-white rounded-full flex border-2 border-gray-300 h-8 w-8 z-10 relative items-center justify-center group-hover:border-gray-400">
                  <span class="rounded-full bg-gray-300 h-2.5 w-2.5" />
                </span>
              </div>
              <div class="flex flex-col flex-1 ml-4 min-w-0">
                <span class="font-medium text-sm text-gray-500">{{
                  step.name
                }}</span>
                <div
                  flex
                  items-center
                  justify="between"
                  w-full>
                  <div class="text-sm text-gray-500">
                    {{ step.description }}
                  </div>
                  <div
                    flex
                    items-center
                    text-white>
                    <span mr-2>{{ step.amount }}</span>
                    <span class="h-5 w-5 i-logos-bitcoin" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </li>
      </ol>
      <div
        flex
        space-x-4
        justify-end
        text-xs
        text-gray-5
        items-center
        pt-10>
        <div
          flex
          items-center
          space-x-2>
          <span>Wait for verify</span>
          <span class="flex h-4 items-center">
            <span
              class="rounded-full flex bg-lime-600 h-4 w-4 z-10 relative items-center justify-center group-hover:bg-lime-800">
              <CheckIcon
                class="h-2 text-white w-2"
                aria-hidden="true" />
            </span>
          </span>
        </div>
        <div
          flex
          items-center
          space-x-2>
          <span>Collected</span>
          <span class="flex h-4 items-center">
            <span
              class="rounded-full flex bg-green-600 h-4 w-4 z-10 relative items-center justify-center group-hover:bg-green-800">
              <CheckIcon
                class="h-2 text-white w-2"
                aria-hidden="true" />
            </span>
          </span>
        </div>
        <div
          flex
          items-center
          space-x-2>
          <span>Wait for collect</span>
          <span
            class="flex h-4 items-center"
            aria-hidden="true">
            <span
              class="bg-white rounded-full flex border-2 border-green-600 h-4 w-4 z-10 relative items-center justify-center">
              <span class="rounded-full bg-green-600 h-1 w-1" />
            </span>
          </span>
        </div>
      </div>
    </BsLoading>
    <PowerFollowModal />
    <PowerRetweetDialog
      v-bind="retweetData"
      :doClaim="doClaim"
      :show="isShowRetweet"
      :isLoading="isLoading"
      @close="isShowRetweet = false" />
    <PowerDiscordDialog
      :discordJoinLink="discordJoinLink"
      :doClaim="doClaim"
      :show="isShowDiscord"
      :isLoading="isLoading"
      @close="isShowDiscord = false" />
    <PowerInviteDialog
      :show="isShowInvite"
      @close="isShowInvite = false" />
  </div>
</template>
