<template>
  <div class="bg-primary dark:bg-primary-dark border-t py-5 text-xl">
    <div class="flex justify-center font-bold mb-2">
      Powered by
    </div>
    <div class="flex justify-center">
      <div class="px-8">
        <NuxtLink
          to="https://www.bproto.io"
          target="_blank"
        >
          <img 
            class="w-28"
            src="~/assets/img/logos/bproto-white.svg" 
          >
        </NuxtLink>
      </div>

      <div class="px-8">
        <NuxtLink
          to="https://www.crtx.app"
          target="_blank"
        >
          <img 
            class="w-28"
            src="~/assets/img/logos/crtx-white.svg" 
          >
        </NuxtLink>
      </div>
    </div>
  </div>
</template>