<template>
  <div class="bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end relative text-white">
    <Title>.{{ tld }}</Title>

    <CommonNavbarTop />

    <main class="flex flex-1 flex-col">
      <slot />
    </main>

    <CommonPageBottom />
  </div>
</template>

<script>
  import store from '~/store';

  export default {
    data() {
      return {
        ...store
      }
    }
  }
</script>