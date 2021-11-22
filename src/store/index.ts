import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";
import { Post } from "./posts";
import { Auth } from "./auth";
import { Admin } from "./admin";
import { Match } from "./match";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    auth: false,
  },
  modules: {
    Post,
    Auth,
    Admin,
    Match,
  },
};
export default new Vuex.Store<RootState>(store);
