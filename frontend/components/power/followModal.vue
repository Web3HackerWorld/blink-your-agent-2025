<script setup lang="ts">
const { isShow, toggle, link, cb, isLoading: isFollowLoading } = $(followStore())
let isLoading = $ref(false)
let hasOpenLink = $ref(false)
const openLink = async () => {
  isLoading = true
  window.open(link, '_blank')

  setTimeout(() => {
    isLoading = false
    hasOpenLink = true
  }, 2000);
}
</script>

<template>
  <BsDialogDefault :show="isShow" @close="toggle">
    <div class="space-y-6 py-8 sm:min-w-sm">
      <p text-gray-9 text-center max-w-sm>Be sure you follow right now, our server will verify the follow action in the background later. Only validate pass user can get the reward.</p>
      <BsLoading :isLoading="isLoading" mx-auto tb>
        <div space-y-3 text-center>
          <BsBtnBlack @click="openLink" v-if="!hasOpenLink">
            <span>Follow on Twitter</span>
            <span i-logos-twitter h-5 w-5 ml-2 />
          </BsBtnBlack>
          <BsBtnIndigo @click="cb" v-else :isLoading="isFollowLoading">
            Submit claim action
          </BsBtnIndigo>
        </div>
      </BsLoading>
    </div>
  </BsDialogDefault>
</template>
