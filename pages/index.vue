<template>
    <div class="text-xl bg-green-200">
        {{ test }}
    </div>
</template>
  

<script>
    export default {
        setup() {
            const test = "This is a test."

            return { test }
        }
    }
</script>