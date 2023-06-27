<template>
  <div>
    <PressSearch 
      :tld="tld"
      main-tw-css-classes="text-black"
      input-tw-css-classes="w-full"
      :restricted-terms="restrictedTerms" 
      :restricted-beginnings="restrictedBeginnings" 
      @update-typing="updateTyping"
      @update-available="updateAvailable"
    />
  </div>
</template>

<script>
  import store from '~/store';

  export default {
    data() {
      return {
        ...store,
        available: false,
        typing: false,
        domain: '',
        restrictedTerms: [],
        restrictedBeginnings: []
      }
    },
    methods: {
      updateAvailable(available, domain) {
        this.available = available;
        this.typing = false;
        this.domain = domain;
      },
      updateTyping(typing) {
        this.typing = typing;
      }
    },
  }
</script>