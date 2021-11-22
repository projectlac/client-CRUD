<template>
  <div class="home d-flex justify-center">
    <Drawer />

    <ViewAll />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Drawer from "../components/Dashboard/Drawer.vue";
import ViewAll from "../components/Dashboard/ViewAll.vue";

@Component({
  components: {
    ViewAll,

    Drawer,
  },
})
export default class UserBoard extends Vue {}
</script>
