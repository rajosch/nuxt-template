<template>
  <div>
    <TopDown
      v-if="errorHappened"
      tw-css-classes="bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end text-white text-xl p-4 sm:p-0 sm:text-3xl"
    >
      <img 
        src="~assets/img/logo.svg"
        class="w-16 sm:w-24 md:w-36 sm:p-5 p-1 sm:mx-0 mx-3"
      >

      <div class="w-full grid place-items-center font-semibold">
        {{ message }}
      </div>
    </TopDown>

    <TopDown
      v-if="successHappened"
      tw-css-classes="bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end text-white text-xl p-4 sm:p-0 sm:text-3xl"
    >
      <img 
        src="~assets/img/logo.svg"
        class="w-16 sm:w-24 md:w-36 sm:p-5 p-1 sm:mx-0 mx-3"
      >

      <div class="w-full grid place-items-center font-semibold sm:p-0 p-1">
        {{ message }}
      </div>
    </TopDown>
  </div>
</template>

<script>
import store from '~/store'
export default {
    data() {
        return {
            ...store
        }
    }
}
</script>