<template>
  <div
    id="home"
    class="overflow-x-hidden flex items-center justify-center"
  >
    <div class="">
      <!-- COPY SECTION -->
      <div class="flex flex-col gap-y-10 sm:flex-row">
        <div class="text-left text-shadow w-full sm:w-3/5">
          <h1 class="text-4xl md:text-5xl uppercase">
            {{ title }}
          </h1>
          <div class="mt-5 text-lg md:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Dolor purus non enim praesent elementum facilisis leo. 
            Ac turpis egestas maecenas pharetra convallis posuere. In hac habitasse platea dictumst. 
            Magna eget est lorem ipsum dolor. Orci porta non pulvinar neque laoreet.
          </div>
        </div>

        <!-- IMAGE SECTION -->
        <div class="hidden sm:flex justify-center w-2/5">
          <img
            class="w-full sm:w-3/4 md:w-1/2"
            src="~assets/img/logos/hero.svg"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '~/store';

  export default {
    data() {
      return {
        ...store,
      }
    },
  }
</script>