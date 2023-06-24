<template>
  <div class="relative mx-5 my-10 md:mx-20 md:my-20 h-full">
    <SectionHero />

    <SectionAbout />

    <SectionFeatures />

    <!-- Widgets and other divs which appear on top of the sections. -->
        
    <!-- <router-link
            v-show="!isTop"
            to="/#home" 
            id="scrollUpButton" 
            class="fade-in sm:hidden block fixed bottom-5 right-5 rounded-full bg-gradient-to-r from-lime-600 to-green-500 border p-3"
           
        >
            <ArrowUpIcon class="w-6 h-6 text-white"/>
        </router-link> -->
  </div>
</template>

<!-- <script>
import { ArrowUpIcon } from '@heroicons/vue/solid'

export default {
    components: {
        ArrowUpIcon,
    },
    data() {
        return {
            isTop: true,
            passedSearchBar: false,
        }
    },
    methods: {
        checkScroll() {      
            const el = document.getElementById("main-search")
            const rect = el.getBoundingClientRect()
            this.isTop =  window.pageYOffset < 200;
            this.passedSearchBar =  0 > rect.bottom;
        },
    },
    mounted() {
        window.addEventListener("scroll", this.checkScroll)
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.checkScroll)
    }

}
</script>

<style>
@keyframes fadeInFromTop {
    0% {
        transform: translateY(-25%);
    }

    100% {
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeInFromTop 0.5s ease-out forwards;
}
</style> -->