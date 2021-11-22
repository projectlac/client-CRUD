<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="'./' + barImage"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>
    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item>
        <v-list-item-avatar class="align-self-center" color="white" contain>
          <v-img
            src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
            max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="display-1 text-capitalize"
            v-text="'hello ' + user"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in items">
        <ItemGroup v-if="item.children" :key="i" :item="item">
          <!--  -->
        </ItemGroup>

        <Item v-else :key="i" :item="item" />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Getter } from "vuex-class";
import ItemGroup from "./Support/ItemGroup.vue";
import Item from "./Support/Item.vue";
@Component({
  components: {
    ItemGroup,
    Item,
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
  },
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },
})
export default class Home extends Vue {
  user: any = localStorage.getItem("user");
  expandOnHover: Boolean = false;
  items: Array<object> = [
    // {
    //   icon: 'mdi-view-dashboard',
    //   title: 'Danh sách Trận đấu',
    //   to: '/das',
    // },
    {
      icon: "mdi-account",
      title: "Danh sách thức thần",
      to: "/score",
    },
  ];
  @Getter barImage!: string;
  @Getter barColor!: string;
}
</script>
