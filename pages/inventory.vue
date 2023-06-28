<template>
  <div class="mx-32 my-10 text-xl">
    <div
      v-if="selectedDomain"
      class="h-full"
    >
      <div class="flex items-center mb-8">
        <ArrowLeftIcon
          v-if="selectedDomainIndex"
          class="w-6 h-6 cursor-pointer"
          @click="loadFormerDomain()"
        />
        <div class="text-2xl font-bold mx-2 mb-1">
          {{ selectedDomain.fqn }}
        </div>
        <ArrowRightIcon
          v-if="selectedDomainIndex < domains.length - 1"
          class="w-6 h-6 cursor-pointer"
          @click="LoadNextDomain()"
        />
      </div>
      <div class="md:flex justify-between">
        <div class="mb-5 grid place-items-center">
          <img 
            src="~/assets/img/logo.svg"
            class="w-44 sm:w-52 md:w-96"
          >
        </div>

        <div class="w-full grid place-items-center md:block md:ml-5">
          <div
            v-if="loadingSubdomains"
            class="h-full grid place-items-center"
          >
            <div class="flex items-center">
              <div class="w-7 h-7 animate-spin mr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <div>Looking for subdomains...</div>
            </div>
          </div>
          <div 
            v-else
            class="w-full grid place-items-center"
          >
            <div class="w-1/3 border rounded-md">
              <div 
                class="py-3 px-2 font-semibold border-b bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end"
              >
                Subdomains
              </div>
              <div class="max-h-96 overflow-x-auto ">
                <div
                  v-for="(fqn, index) in subdomains"
                  :key="fqn"
                  class="text-lg"
                  @click="selectDomain(fqn)"
                >
                  <div 
                    class="cursor-pointer p-2 hover:bg-gradient-to-r dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end"
                    :class="{ 'bg-gradient-to-l dark:from-primary-start-dark dark:to-primary-end-dark from-primary-start to-primary-end': index % 2 === 0 }"
                  >
                    {{ fqn.fqn }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid place-items-center">
        <div class="w-1/3 mt-10 sm:mt-0">
          <RegisterDomain
            :contract-address="zoneContract"
            :parent="selectedDomain.fqn"
            button-css="p-2 rounded-md cursor-pointer hover:bg-primary dark:hover:bg-primary-dark"
            @update-namehash="updateNamehash"
          />
        </div>
      </div>
    </div> 
    <div
      v-else
      class="h-full grid place-items-center"
    >
      <div>
        This account does not own any .{{ tld }} domains!
      </div>
    </div>
  </div>
</template>

<script>
  import store from '~/store';
  import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/solid'

  export default {
    components: {
      ArrowLeftIcon,
      ArrowRightIcon
    },
    data(){
      return {
        ...store,
        searchTerm: '',
        expand: false,
        selectedDomain: undefined,
        domains: [],
        subdomains: []
      }
    },
    computed: {
      selectedDomainIndex() {
        return this.domains.findIndex(obj => obj.fqn === this.selectedDomain.fqn);
      }
    },
    beforeMount() {
      this.selectedDomain = this.domains[0];
    },
    methods: {
      async loadFormerDomain() {
        this.selectDomain(this.domains[this.selectedDomainIndex-1]);
      },
      async LoadNextDomain() {
        this.selectDomain(this.domains[this.selectedDomainIndex+1]);
      },
      async selectDomain(fqn) {
        this.selectedDomain = fqn;
      }
    }
  }; 
</script>