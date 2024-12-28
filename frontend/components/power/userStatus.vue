<script setup lang="ts">
  const {
    waitForCollectAmount,
    alreadyCollectedAmount,
    requiredMiniAmount,
    doCollect,
    isLoading,
    showDepositGasDialog,
  } = $(taskStore())

  const percent = $computed(() =>
    waitForCollectAmount > requiredMiniAmount
      ? requiredMiniAmount
      : waitForCollectAmount
  )
  const r = 80
  const circumference = ((2 * 22) / 7) * r
  const offset = $computed(
    () => circumference - (percent / requiredMiniAmount) * circumference
  )

  const showLineCreateDialog = $ref(false)
  const { hasCreateLine, queryToken } = $(friendHelpNFTStore())
  onMounted(queryToken)
</script>

<template>
  <div flex-1>
    <div
      flex-1
      h-full
      flex
      items-center
      justify-start
      flex-col>
      <div>
        <div class="flex items-center justify-center">
          <svg class="h-72 transform w-72 -rotate-90">
            <circle
              cx="145"
              cy="145"
              :r="r"
              stroke="currentColor"
              stroke-width="15"
              fill="transparent"
              class="text-gray-700" />
            <circle
              cx="145"
              cy="145"
              :r="r"
              stroke="currentColor"
              stroke-width="15"
              fill="transparent"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="offset"
              class="text-green-500" />
          </svg>
          <span class="text-white text-3xl absolute"
            >{{ waitForCollectAmount }} / {{ requiredMiniAmount }}</span
          >
        </div>
        <BsBtnIndigo
          rounded-xl
          @click="doCollect"
          :disabled="waitForCollectAmount < requiredMiniAmount"
          :isLoading="isLoading">
          Collect {{ requiredMiniAmount }} $AI
        </BsBtnIndigo>
        <div
          text-gray-5
          mt-5>
          Once you reach {{ requiredMiniAmount }} $AI, you can collect.
        </div>
        <div
          text-white
          pt-10
          w-full
          text-left
          v-if="alreadyCollectedAmount > 0">
          Already collected:
          <span
            font-bold
            text-green-7
            text-4xl
            px-5
            >{{ alreadyCollectedAmount }}
          </span>
          $AI
        </div>
        <button
          @click="showLineCreateDialog = true"
          rounded-xl
          animate-bounce
          bg-rainbow
          my-10
          flex
          p-3
          items-center
          justify-center
          v-if="!hasCreateLine && alreadyCollectedAmount > 99">
          Create your first "Line" in Radar now!
          <span
            i-material-symbols-arrow-forward-rounded
            w-5
            h-5
            ml-2
            block></span>
        </button>
      </div>
      <BsBtnIndigo
        v-if="false"
        rounded-xl
        animate-bounce
        bg-rainbow
        my-10>
        Get $AI Now
        <span
          i-material-symbols-arrow-forward-rounded
          w-5
          h-5
          ml-2
          hidden
          lg:block></span>
        <span
          i-material-symbols-arrow-downward-rounded
          w-5
          h-5
          ml-2
          lg:hidden></span>
      </BsBtnIndigo>
    </div>
    <PowerLineCreateDialog
      :show="showLineCreateDialog"
      @close="showLineCreateDialog = false" />
    <PowerDepositGasDialog
      :show="showDepositGasDialog"
      @close="showDepositGasDialog = false" />
  </div>
</template>
