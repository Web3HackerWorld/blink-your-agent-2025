<template>
  <div class="mx-auto">
    <h2 class="font-bold tracking-tight text-2xl text-gray-100">Feature Friends</h2>

    <div class="mt-6 grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <div v-for="product in products" :key="product.id" class="group relative">
        <div class="rounded-md bg-gray-200 w-full overflow-hidden aspect-h-1 aspect-w-1 lg:h-80 lg:aspect-none group-hover:opacity-75">
          <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full object-cover object-center w-full lg:h-full lg:w-full" />
        </div>
        <div class="flex mt-4 justify-between">
          <div>
            <h3 class="text-sm text-gray-300">
              <a :href="product.href">
                <span aria-hidden="true" class="inset-0 absolute" />
                {{ product.name }}
              </a>
            </h3>
            <p class="mt-1 text-sm text-gray-400">{{ product.color }}</p>
          </div>
          <p class="font-medium text-sm text-gray-100">{{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
]
</script>