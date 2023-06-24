<template>
  <div class="bg-primary border-t py-5  text-white text-xl">
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
            src="~/assets/img/bproto-logo-white.svg" 
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
            src="~/assets/img/crtx-logo-white.svg" 
          >
        </NuxtLink>
      </div>
    </div>
  </div>
</template>