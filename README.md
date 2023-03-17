# Fast setup temmplate for nuxt 3

## Install

Make sure to install the dependencies:

```bash
npm install @nuxtjs/tailwindcss nuxt-template
```

## nuxt.config.ts

```ts
defineNuxtConfig({
  extends: [
    'nuxt-template'
  ],
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
```



