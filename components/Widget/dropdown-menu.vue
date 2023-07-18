<template>
  <div class="relative">
    <button
      :disabled="disabled"
      class="w-full py-1 pl-3 bg-primary dark:bg-primary-dark rounded-md text-start"
      :class="[{'opacity-50' : disabled}]"
      @click="toggleOpen"
    >
      <div class="flex items-center justify-start w-5/6">
        <div class="uppercase">
          {{ selectedItem.fqn || selectMessage }}
        </div>
      </div>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          class="w-5 h-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>
    <div
      v-show="isOpen"
      class="absolute z-10 mt-1 w-full bg-primary dark:bg-primary-dark rounded-md shadow-lg grid gap-y-2 max-h-96 overflow-x-auto"
    >
      <button
        v-for="item in items"
        :key="item"
        class="relative p-1 hover:bg-light-primary dark:hover:bg-dark-primary text-start"
        @click="selectItem(item)"
      >
        {{ item.fqn }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selectedItem: {
        type: Object,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      selectMessage: {
        type: String,
        default: 'Select an item'
      },
      disabled: {
        type: Boolean,
        default: false
      },
    },
    emits: ['update-item'],
    data() {
      return{
        isOpen: false,
      }
    },
    mounted() {
      document.addEventListener('click', this.closeOnClickOutside);
    },
    unmounted() {
      document.removeEventListener('click', this.closeOnClickOutside);
    },
    methods: {
      toggleOpen() {
        this.isOpen = !this.isOpen;
      },
      closeOnClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.isOpen = false;
        }
      },
      selectItem(item) {
        this.$emit('update-item', item);
        this.isOpen = !this.isOpen;
      },
    }
  };
</script>
