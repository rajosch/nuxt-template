<template>
  <div class="text-xl font-bold bg-green-300 text-red-300">
    This is a test if everything works.
  </div>
  <div>
    <ArrowLeftIcon class="block h-7 w-7 cursor-pointer" aria-hidden="true"/>
  </div>
</template>

<script>
    import { ArrowLeftIcon } from '@heroicons/vue/solid'
    export default {
        components: { ArrowLeftIcon }
    }
</script>
