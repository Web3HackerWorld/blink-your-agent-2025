<script setup lang="ts">
useHead({
  titleTemplate: `%s - AI Agent Twitter World`,
});

const route = useRoute();
watchEffect(() => {
  if (!route.query.isDebug) return;

  setLsItem("isDebug", route.query.isDebug);
});
const lsIsDebug = getLsItem("isDebug", "no");

const isDebug = $computed(() => lsIsDebug === "yes");
provide("isDebug", $$(isDebug));

const ref = $computed(() => route.query.ref || "");
const existRef = getLsItem("ref", false);
if (!existRef) {
  setLsItem("ref", ref);
}

const color = useColorMode();

color.value = "dark";

useHead({
  meta: [
    {
      id: "theme-color",
      name: "theme-color",
      content: () => (color.value === "dark" ? "#222222" : "#ffffff"),
    },
  ],
});

color.preference = color.value === "dark" ? "light" : "dark";
</script>
<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
