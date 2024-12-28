<script setup lang="ts">
const route = useRoute()
const noBg = $computed(() => route.meta.noBg)
</script>

<template>
  <div>
    <slot />
    <BsLogin />
    <BsNotification />
    <BsOnboardModal />
    <BsChainSwitchModal />
    <BsAlertDialog />
  </div>
</template>
