import { reactive, toRefs } from "vue";

const state = reactive({
    // put state variables here
    title: 'My Website'
});

function setTitle(title) {
  state.title = title;
}


export default {
  ...toRefs(state),
  setTitle,
};