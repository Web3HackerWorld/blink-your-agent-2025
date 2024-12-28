<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const list = [
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg',
]

const isLtSm = $(useMediaQuery('(min-width: 640px)'))
const isLtMd = $(useMediaQuery('(min-width: 768px)'))

const itemsToShow = $computed(() => {
  if (isLtMd) {
    return 3
  }
  if (isLtSm) {
    return 2
  }
  return 1
})

</script>
<template>
  <div overflow-hidden rounded-lg>
    <carousel :itemsToShow="itemsToShow" :wrapAround="true" :transition="500">
      <slide v-for="item in list" :key="item">
        <div class="rounded-lg h-80 w-full  overflow-hidden relative sm:pr-2">
          <img class="rounded-lg h-full min-w-full object-cover" :src="item" />
          <div text-gray-8 absolute bottom-0 left-0 text-base font-bold text-left px-3 pb-3>
            <div>Charles Peterson Grunge Years NFT collection - Classics</div>
            <div font-bold>
              25 $AI
            </div>
          </div>
        </div>
      </slide>
      <template #addons>
        <navigation />
        <!-- <pagination /> -->
      </template>
    </carousel>
  </div>
</template>