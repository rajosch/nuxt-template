<template>
  <div class="bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end relative text-white min-h-screen">
    <Title>.{{ tld }}</Title>

    <!-- Widgets -->
    <WidgetEventNotification />

    <CommonNavbarTop />

    <main class="flex flex-1 flex-col h-full">
      <slot />
    </main>
    
    <CommonPageBottom class="absolute w-full bottom-0" />
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