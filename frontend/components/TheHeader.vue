<script setup lang="ts">
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from '@headlessui/vue'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import ClarityDashboardSolidBadged from '~icons/clarity/dashboard-solid-badged'
  import IcBaselineExplore from '~icons/ic/baseline-explore'
  import FluentArrowTrendingLines20Filled from '~icons/fluent/arrow-trending-lines-20-filled'
  import RiVipDiamondFill from '~icons/ri/vip-diamond-fill'
  import MaterialSymbolsHome from '~icons/material-symbols/home'
  import ZondiconsRadarCopy2 from '~icons/zondicons/radar-copy-2'
  import MaterialSymbolsSwapHorizontalCircleRounded from '~icons/material-symbols/swap-horizontal-circle-rounded'
  import LineMdTwitterX from '~icons/line-md/twitter-x'
  import AntDesignIdcardFilled from '~icons/ant-design/idcard-filled'
  import PepiconsPencilCoinsCircleFilled from '~icons/pepicons-pencil/coins-circle-filled'
  import MingcuteIdcardLine from '~icons/mingcute/idcard-line'
  import BasilHotspotSolid from '~icons/basil/hotspot-solid'
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
  import FluentEmojiRocket from '~icons/fluent-emoji/rocket'
  import TeenyiconsViewGridOutline from '~icons/teenyicons/view-grid-outline'
  import LogosBitcoin from '~icons/logos/bitcoin'
  import TablerError404 from '~icons/tabler/error-404'
  import FluentPeopleTeamAdd20Filled from '~icons/fluent/people-team-add-20-filled'
  import HugeiconsArtificialIntelligence04 from '~icons/hugeicons/artificial-intelligence-04'

  const route = useRoute()
  const subNavigation = $computed(() => {
    return [
      {
        name: 'Power',
        href: '/power',
        current: route.path === '/power',
        icon: ClarityDashboardSolidBadged,
        isHighlight: false,
      },
      {
        name: '$AI',
        href: '/ai',
        current: route.path === '/ai',
        icon: HugeiconsArtificialIntelligence04,
        isHighlight: false,
      },
      {
        name: 'Agent',
        href: '/agent/',
        current: route.path.startsWith('/agent'),
        icon: BasilHotspotSolid,
        isHighlight: false,
      },
      // { name: 'Home', href: '/CreatorX/home', current: route.path === '/CreatorX/home', icon: MaterialSymbolsHome, isHighlight: false },
      // { name: 'Explore', href: '/CreatorX/explore', current: route.path === '/CreatorX/explore', icon: IcBaselineExplore },
      // { name: 'Marketplace', href: '/CreatorX/marketplace', current: route.path === '/CreatorX/marketplace', icon: FluentArrowTrendingLines20Filled, isHighlight: false },
      // { name: 'VIP', href: '/CreatorX/vip', current: route.path === '/CreatorX/vip', icon: RiVipDiamondFill, isHighlight: true },
    ]
  })

  const currentRouteLevel = $computed(() => {
    let path = route.path
    if (path.endsWith('/')) {
      path = path.substring(0, path.length - 1)
    }
    const lens = path.split('/').length
    console.log(lens, path)
    return lens - 1
  })

  const {
    toggle,
    doInitMPC,
    update,
    account,
    address,
    chain,
    linkToExplorer,
    gasBalance,
    bstBalance,
    currency,
  } = $(rwaAuthStore())
  const { doSignOut, isLogin, avatar, name } = $(supabaseStore())

  const userNavigation = $computed(() => {
    return [
      // { name: 'Your Profile', href: '#' },
      // { name: 'Settings', href: '#' },
      { name: 'Sign out', onClick: doSignOut },
    ]
  })

  watchEffect(async () => {
    if (!isLogin) return
    if (account) return
    await doInitMPC()
  })

  const router = useRouter()

  watch(
    () => router.currentRoute.value.path,
    (toPath) => {
      const redirectPath = `${location.origin}${location.pathname}`
      update('redirectPath', redirectPath)
    }
  )
</script>
<template>
  <div
    class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    ref="el">
    <div class="flex h-16 items-center justify-between">
      <div class="flex flex-1 items-center">
        <NuxtLink
          class="flex-shrink-0 mr-2"
          to="/">
          <img
            class="h-16 w-16"
            src="/logo.png" />
        </NuxtLink>
        <div class="w-full md:block">
          <div class="flex items-baseline justify-center sm:space-x-2">
            <NuxtLink
              class="flex relative items-center"
              :to="item.href"
              v-for="item in subNavigation"
              :key="item.name"
              :class="[
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-2 md:px-3 py-2 text-sm font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined">
              <span
                class="flex h-3 -top-1 -right-1 w-3 absolute"
                v-if="item.isHighlight">
                <span
                  class="rounded-full h-full bg-sky-400 w-full opacity-75 animate-ping absolute inline-flex"></span>
                <span
                  class="rounded-full bg-sky-500 h-3 w-3 relative inline-flex"></span>
              </span>
              <component
                :is="item.icon"
                class="h-6 w-6"
                aria-hidden="true" />
              <span
                hidden
                sm:flex
                ml-2
                >{{ item.name }}</span
              >
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- top nav right part -->
      <div>
        <button
          @click="toggle"
          v-if="!isLogin"
          class="flex font-semibold text-sm text-white leading-6 items-center">
          <span
            hidden
            sm:block>
            Log in <span aria-hidden="true">&rarr;</span>
          </span>
          <span
            block
            sm:hidden
            w-6
            h-6
            i-ic-baseline-account-circle />
        </button>
        <div
          class="flex ml-4 items-center md:ml-6"
          v-if="isLogin">
          <button
            hidden
            type="button"
            class="rounded-full bg-gray-800 p-1 text-gray-400 relative hover:text-white focus:outline-none focus:ring-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="-inset-1.5 absolute" />
            <span class="sr-only">View notifications</span>
            <BellIcon
              class="h-6 w-6"
              aria-hidden="true" />
          </button>

          <NetworkSwitcher />
          <Menu
            as="div"
            class="text-left ml-3 relative inline-block">
            <div>
              <MenuButton
                class="rounded-full flex max-w-xs bg-gray-800 text-sm relative items-center focus:outline-none focus:ring-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="-inset-1.5 absolute" />
                <span class="sr-only">Open user menu</span>
                <img
                  class="rounded-full h-8 w-8"
                  :src="avatar"
                  alt="" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="divide-y bg-white rounded-md divide-gray-100 shadow-lg ring-black mt-2 origin-top-right right-0 ring-1 ring-opacity-5 w-56 z-10 absolute focus:outline-none">
                <div class="py-3 px-4 text-gray-8">
                  <a
                    :href="`https://x.com/${name}`"
                    target="_blank"
                    class="flex font-medium text-sky-4 truncate items-center hover:underline">
                    <span
                      mr-2
                      w-4
                      h-4
                      i-logos-twitter />
                    <span>
                      {{ name }}
                    </span>
                  </a>
                  <!-- <a :href="linkToExplorer(`/`)" target="_blank" class="flex items-center hover:underline">
                    <span mr-2 w-4 h-4 i-zondicons-network />
                    <span>{{ chain.name }}</span>
                  </a> -->
                  <div v-if="account.address">
                    <a
                      :href="linkToExplorer(`/address/${account.address}`)"
                      target="_blank"
                      class="flex items-center hover:underline">
                      <span
                        mr-2
                        w-4
                        h-4
                        i-logos-ethereum-color />
                      <span>{{ shortAddress(account.address) }}</span>
                    </a>
                    <a
                      :href="linkToExplorer(`/address/${address}`)"
                      target="_blank"
                      class="flex items-center hover:underline">
                      <span
                        mr-2
                        w-4
                        h-4
                        i-carbon-gas-station-filled />
                      <span>{{ numberFormat(gasBalance) }} {{ currency }}</span>
                    </a>
                    <a
                      :href="linkToExplorer(`/address/${address}`)"
                      target="_blank"
                      class="flex items-center hover:underline">
                      <span
                        mr-2
                        w-4
                        h-4
                        i-logos-bitcoin />
                      <span
                        >{{
                          numberFormat(formatEther(bstBalance), 4)
                        }}
                        $AI</span
                      >
                    </a>
                  </div>
                </div>
                <div class="py-1 hidden">
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      >Account settings</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      >Support</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                      >License</a
                    >
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'w-full block text-left px-4 py-2 text-sm text-gray-700',
                      ]"
                      v-if="item.onClick"
                      @click="item.onClick">
                      {{ item.name }}
                    </button>
                    <a
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      v-else
                      >{{ item.name }}</a
                    >
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>
