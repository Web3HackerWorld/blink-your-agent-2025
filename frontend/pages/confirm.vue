<script setup lang="ts">
const user = useSupabaseUser()

const route = useRoute();
const { supabase } = $(supabaseStore())

useHead({
  title: 'Auth Succeed!',
})
definePageMeta({
  layout: 'blank-h-full',
  description: `World's first AI Agent Twitter World: The ability to Tokenize real-world assets, Unleash the boundary of Web3 and Bring all human into metaverse.`
})

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_OUT" || event === "USER_DELETED") {
    // delete cookies on sign out
    const expires = new Date(0).toUTCString();
    document.cookie = `sb-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    document.cookie = `sb-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
  } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
    const maxAge = 100 * 365 * 24 * 60 * 60; // 1 year, (but the Supabase token probably expires before then)
    document.cookie = `sb-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
    document.cookie = `sb-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
  }

  if (route.query.to !== undefined) {
    let to = route.query.to
    to = to.replace('https://www.ai-agent-twitter.world', '')
    to = to.replace('https://dev.ai-agent-twitter.world', '')
    to = to.replace('http://localhost:3000', '')

    navigateTo(to)
  }
});


watch(user, () => {
  if (!user.value) return

  if (route.query.to !== undefined) {
    let to = route.query.to
    to = to.replace('https://www.ai-agent-twitter.world', '')
    to = to.replace('https://dev.ai-agent-twitter.world', '')
    to = to.replace('http://localhost:3000', '')

    navigateTo(to)
  } else {
    navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <div>
    <p class="text-black">
      Redirecting...
    </p>
  </div>
</template>