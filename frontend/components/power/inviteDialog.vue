<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

interface Props {
  show: boolean;
}
let { show = false } = defineProps<Props>();

const emit = defineEmits(["close"]);
const { name } = $(supabaseStore());
const { alertSuccess } = $(notificationStore());

const refLink = $computed(() => `${location.origin}${location.pathname}?ref=${name}`);
const text = 'Join me on "CreatorX" and get your first 100 $AI today!  🚀🚀🚀🚀 ';

const source = $computed(() => `${text} ${refLink}`);
const { copy } = useClipboard({ source });

const doCopy = () => {
  copy(source);
  alertSuccess("Copy Invite Link succeed!");
};

const xShareLink = $computed(() => `https://twitter.com/intent/tweet?text=${text} ${refLink}`);
const tgShareLink = $computed(() => `https://t.me/share/url?url=${refLink}&text=${text}`);
</script>

<template>
  <BsDialogDefault :show="show" :no-padding="true" @close="$emit('close')">
    <div class="bg-lime-600 max-w-2xl py-6 px-3 shadow-2xl relative isolate overflow-hidden sm:rounded-3xl sm:px-12 xl:py-8">
      <h2 class="mx-auto my-10 text-white text-center tracking-tight max-w-2xl text-2xl sm:text-3xl">Invite friend to get 100 $AI</h2>
      <div flex-cc>
        <div flex flex-col items-center w-full>
          <div flex items-center>
            <input
              type="url"
              class="rounded-l-md bg-white/5 border-0 shadow-sm ring-inset text-white w-sm py-2 px-3.5 ring-0 ring-white/10 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-white focus:ring-2"
              disabled
              :value="refLink"
            />

            <BsBtnBlack @click="doCopy" class="border-none! rounded-r-md! rounded-l-none! outline-none! shadow-none! ring-none! py-3!">
              <span i-bxs-copy ml-1></span>
            </BsBtnBlack>
          </div>

          <div flex space-x-4 mt-10 text-white>
            <a :href="xShareLink" target="_blank" class="bg-black rounded-full flex py-3 px-6 items-center">
              Share via Twitter
              <span i-mdi-twitter ml-1></span>
            </a>
            <a :href="tgShareLink" target="_blank" class="bg-black rounded-full flex py-3 px-6 items-center">
              Share via TG
              <span i-cib-telegram-plane ml-1></span>
            </a>
          </div>
          <div text-gray-400 text-base pt-10 leading-5>
            After your friend join and bind account in discord <br />
            You will get the 100 $AI then.
          </div>
        </div>
      </div>
      <svg viewBox="0 0 1024 1024" class="h-[64rem] top-1/2 left-1/2 w-[64rem] -z-10 -translate-x-1/2 absolute" aria-hidden="true">
        <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
        <defs>
          <radialGradient
            id="759c1415-0410-454c-8f7c-9a820de03641"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(512 512) rotate(90) scale(512)"
          >
            <stop stop-color="#7775D6" />
            <stop offset="1" stop-color="#E935C1" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  </BsDialogDefault>
</template>
