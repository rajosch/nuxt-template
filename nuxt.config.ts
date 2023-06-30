// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  extends: [
    '@crtxio/bproto-contract-call',
    '@crtxio/bproto-domain-lookup',
    '@crtxio/wallet',
    '@crtxio/notification',
    '@crtxio/search',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
})