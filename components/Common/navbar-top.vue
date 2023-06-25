<template>
  <div class="shadow-md">
    <div class="flex justify-between items-center text-2xl sm:p-2 md:p-5">
      <!-- --- Desktop --- -->
      <div
        id="desktop"
        class="hidden sm:flex w-full"
      >
        <div class="flex items-center">
          <img
            class="h-16 pr-10"
            src="~/assets/img/logo.svg"
          >
          <div class="text-3xl font-bold">
            {{ tld }}
          </div>
        </div>


        <!-- Navigation -->
        <div class="flex justify-center items-center flex-grow">
          <div
            v-for="item in navigation"
            :key="item"
            class="px-5"
          >
            <div class="relative">
              <div class="flex items-center">
                <router-link
                  :to="item[0]"
                  class="text-xl p-2 py-3 px-3 hover:opacity-100"
                  :class="[{ 'opacity-100': $route.path === item[0] }, { 'opacity-50': $route.path !== item[0] }]"
                >
                  {{ item[1] }}
                </router-link>
              </div>
            </div>
          </div>
        </div>


        <div class="flex items-center">
          <DarkModeToggle />
          <Wallet
            connect-class-properties="text-lg font-semibold"
            expanded-class-properties="bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end relative"
            :services="['metamask']"
          />
        </div>
      </div>

      <!-- --- Mobile --- -->
      <div
        id="mobile"
        class="grid sm:hidden w-full"
      >
        <div class="w-full flex justify-between py-4 px-2 items-center">
          <div class="flex items-center">
            <img
              class="h-12 pr-5"
              src="~/assets/img/logo.svg"
            >
            <div class="text-2xl font-bold">
              {{ tld }}
            </div>
          </div>

          <div
            v-if="!toggleNav"
            class="flex justify-end"
          >
            <button
              class="mr-3"
              @click="toggleNav = !toggleNav"
            >
              <svg
                class="fill-current h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
            <DarkModeToggle />
          </div>
        </div>

        <!-- Navigation -->
        <div
          v-if="toggleNav"
          class="w-full text-xl flex justify-center my-5"
        >
          <div
            v-for="item in navigation"
            :key="item"
          >
            <router-link
              :to="item[0]"
              class="text-xl p-2 py-3 px-3"
              :class="[{ 'opacity-100': $route.path === item[0] }, { 'opacity-50': $route.path !== item[0]}]"
              @click="toggleNav = !toggleNav"
            >
              {{ item[1] }}
            </router-link>
            <a
              :href="item[0]"
              class="text-xl p-2 py-3 rounded-full"
              target="_blank"
              @click="toggleNav = !toggleNav"
            >
              {{ item[1] }}
            </a>
          </div>
        </div>
      
        <div
          v-if="toggleNav"
          class="grid place-items-center w-full"
        >
          <div class="flex items-center my-5">
            <Wallet
              connect-class-properties="text-lg font-semibold"
              expanded-class-properties="bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end relative"
              :services="['metamask']"
            />
          </div>


          <div
            class="w-full mt-2 p-2 grid place-items-center cursor-pointer bg-primary dark:bg-primary-dark"
            @click="toggleNav = !toggleNav"
          >
            <ArrowUpIcon class="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ArrowUpIcon } from '@heroicons/vue/solid';
import store from '~/store';

export default {
  components: {
    ArrowUpIcon
  },
  data() {
      return {
        ...store,
        navigation: [
          ["/", "HOME"],
          ["/#features", "FEATURES"],
          ["/faq", "FAQ"],
        ],
        toggleNav: false,
      }
  },
}
</script>

<style>
  html {
    scroll-behavior: smooth;
  }
</style>
        