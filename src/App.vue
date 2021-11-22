<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
@Component
export default class Login extends Vue {
  @Getter checkAuthentication!: boolean;

  @Action logout!: () => any;
}
</script>
