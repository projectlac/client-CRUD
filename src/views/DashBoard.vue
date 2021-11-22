<template>
  <div>
    <v-row class="mt-4">
      <v-col cols="12">
        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="6"
            ><h2 class="text-center">Danh sách nhóm đấu</h2></v-col
          >
          <v-col cols="3" class="d-flex justify-end pr-10">
            <v-btn color="primary">Tạo nhóm</v-btn>
          </v-col>
        </v-row>
      </v-col>

      <Match v-for="g in listGroup" :key="g.gm_id" :data="g" />
      <!-- <Match />
      <Match />
      <Match /> -->
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import Match from "../components/Team/Match.vue";
@Component({
  components: {
    Match,
  },
})
export default class Team extends Vue {
  @Getter listGroup!: Array<any>;

  @Action getDataMatch!: () => any;

  created() {
    this.getDataMatch();
  }
}
</script>
