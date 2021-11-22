<template>
  <div class="main text-center">
    <Login />

    <!-- <v-btn color="primary">REGISTER</v-btn> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Login from '../components/Login/Login.vue';
@Component({
  components: {
    Login,
  },
})
export default class MainLogin extends Vue {
  loginOrRegister: boolean = true;
}
</script>
