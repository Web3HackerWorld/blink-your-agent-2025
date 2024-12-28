import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['form-input', 'bg-transparent disabled:(cursor-not-allowed text-gray-600)  rounded-lg border-1 border-gray-6 text-white w-full block resize-none placeholder:text-gray-6 sm:text-sm sm:leading-6 p-2! focus:(border-lime-6 outline-none)'],
    ['main-px', 'px-4 sm:px-6 lg:px-8'],
    ['main', 'min-h-[calc(100vh-8em)]'],
    ['text-rainbow', 'bg-gradient-to-r bg-clip-text font-black from-green-400 via-lime-600 to-green-400 text-transparent'],
    ['bg-rainbow', 'bg-gradient-to-r bg-clip-padding font-black from-green-400 via-lime-600 to-green-400 text-white'],
    ['flex-bc', 'flex justify-between items-center'],
    ['flex-ec', 'flex justify-end items-center'],
    ['flex-cc', 'flex justify-center items-center'],
    ['flex-cx', 'flex justify-center'],
    ['flex-cy', 'flex items-center'],
    ['btn', 'rounded-md font-semibold bg-zinc-900 shadow-sm text-sm text-white py-2.5 px-3.5 hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      autoInstall: true,
    }),
    presetTypography(),
    // presetWebFonts({
    //   fonts: {
    //     sans: 'DM Sans',
    //     serif: 'DM Serif Display',
    //     mono: 'DM Mono',
    //   },
    // }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
