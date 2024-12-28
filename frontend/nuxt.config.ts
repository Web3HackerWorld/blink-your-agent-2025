import inject from '@rollup/plugin-inject'
const motion = {
  // TODO: this is not work, need to figure it out
  directives: {
    'pop-bottom': {
      initial: { opacity: 0, y: 100 },
      enter: { opacity: 1, y: 0, scale: 1 },
      variants: { custom: { scale: 2 } },
      hovered: { scale: 2 },
      delay: 200,
      // visible: {
      //   scale: 1,
      //   opacity: 1,
      //   y: 0,
      // }
    }
  }
}
      
export default defineNuxtConfig({
  extends: [
  ],
  imports: {
    dirs: [
      './stores',
    ]
  },
  modules: [
  ],
  app: {
    // https://nuxt.com/docs/getting-started/transitions
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.VERCEL_URL || 'http://localhost:3000',
      web3AuthClientID: '',
      web3AuthJwtVerifierName: '',
      ownerAddress: '',
      signerAddress: '',
      motion,
    },
    discordBotAppId: '',
    discordGuildId: '',
    discordBotPublicKey: '',
    discordBotToken: '',
    signerPrivateKey: '',
    ownerPrivateKey: '',
    circleApiKey: '',
    circleEntitySecret: '',
    circlePublicKeyBase64: '',
  },
  vite: {
    resolve: {
      alias: {
        'node:stream/web': 'stream-browserify'
      },
    },
  },
  build: {
		rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
		},
	},
})
