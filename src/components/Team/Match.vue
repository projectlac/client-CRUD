<template>
  <v-col cols="6" class="mt-2 px-14">
    <v-card dark color="#4caf50">
      <v-card-title class="justify-space-between tableMatch">
        <p>
          {{ data.match }} / Ngày: {{ data.date }} / Thời gian: {{ data.time }}
        </p>
        <v-btn text>Sửa</v-btn>
      </v-card-title>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="listMatch"
      :sort-by="['calories', 'fat']"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
      hide-default-footer
    ></v-data-table>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class Match extends Vue {
  @Prop() data!: object;
  @Getter listMatch!: Array<any>;
  headers: Array<object> = [
    // {
    //   text: "STT",
    //   align: "center",
    //   sortable: false,
    //   width: "50",
    //   value: "stt",
    // },
    { text: "Player1", value: "player1", sortable: false, align: "center" },
    { text: "Tỷ số", value: "score", sortable: false, align: "center" },
    { text: "Player2", value: "player2", sortable: false, align: "center" },
  ];
  // desserts: Array<object> = [
  //   {
  //     stt: 1,
  //     p1: "Player1",
  //     p2: "Player2",
  //     score: "1:2",
  //   },
  //   {
  //     stt: 2,
  //     p1: "Player2",
  //     p2: "Player2",
  //     score: "2:3",
  //   },
  // ];
}
</script>
