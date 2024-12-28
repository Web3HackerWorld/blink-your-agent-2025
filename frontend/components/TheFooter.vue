<script setup lang="ts">
import { useNow, useDateFormat } from '@vueuse/core'
import MdiTwitter from '~icons/mdi/twitter'
import MdiGithub from '~icons/mdi/github'
import IcSharpTelegram from '~icons/ic/sharp-telegram'
import IcBaselineDiscord from '~icons/ic/baseline-discord'

const social = [
  // {
  //   name: 'Telegram',
  //   href: 'https://t.me/+ZkuQTmG7p881NDk1',
  //   icon: IcSharpTelegram,
  // },
  // {
  //   name: 'Discord',
  //   href: 'https://discord.gg/nE5Rf3bdjQ',
  //   icon: IcBaselineDiscord,
  // },
  {
    name: 'Twitter',
    href: 'https://x.com/Web3HackerWorld',
    icon: MdiTwitter,
  },
  // {
  //   name: 'GitHub',
  //   href: 'https://github.com/HelloRWA',
  //   icon: MdiGithub
  // },
]

const currentYear = useDateFormat(useNow(), 'YYYY')
const versionId = useRuntimeConfig().public.versionId
</script>
<template>
  <footer aria-labelledby="footer-heading" class="relative">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl pt-4 pb-8 md:px-8">
      <div class="border-t space-y-3 border-white/10 text-center text-xs pt-8 text-gray-400  md:(flex items-center justify-between flex-row-reverse) ">
        <div class="flex space-x-6 items-center justify-center">
          <a v-for="item in social" :key="item.name" :href="item.href" class="text-gray-500 hover:text-gray-400" target="_blank">
            <span class="sr-only">{{ item.name }}</span>
            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
          </a>
          <span> {{ versionId.substr(-8) }}</span>
        </div>
        <div flex space-x-6 justify-center items-center>
          <a target="_blank" href="/privacy">Privacy</a>
          <a target="_blank" href="/terms">Terms</a>
        </div>
        <p class="mt-8 leading-5 md:mt-0">&copy; {{ currentYear }} ai-agent-twitter.world. </p>
      </div>
    </div>
  </footer>
</template>