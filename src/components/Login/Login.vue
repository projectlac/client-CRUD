<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="5" class="text-center">
        <h4>LOGIN</h4>
        <v-text-field label="Username" outlined v-model="data.user">
        </v-text-field>
        <v-text-field
          label="Password"
          :type="!checkShowPassWord ? 'password' : 'text'"
          outlined
          v-model="data.password"
          :append-icon="!checkShowPassWord ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="showPassword"
        >
        </v-text-field>
        <v-btn
          color="primary mr-4"
          @click="checkAuth([data.user, data.password])"
          >LOGIN</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
type dataLogin = {
  user: string;
  password: string;
};
@Component
export default class Login extends Vue {
  @Getter checkAuthentication!: boolean;
  data: dataLogin = {
    user: '',
    password: '',
  };
  checkShowPassWord: boolean = false;
  showPassword() {
    this.checkShowPassWord = !this.checkShowPassWord;
  }
  @Action('checkAuth')
  checkAuth(val: any) {
    this.checkAuth(val);
  }
  @Watch('checkAuthentication')
  watchAuthentication() {
    if (this.checkAuthentication) {
      this.$router.push('dashboard');
    }
  }
}
</script>
