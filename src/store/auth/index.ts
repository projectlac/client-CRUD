import axios from "axios";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { RootState } from "../types";
import { AuthState } from "./types";
import router from "../../router";
const state: AuthState = {
  checkAuthentication: false,
};
export enum PostGetters {
  checkAuthentication = "checkAuthentication",
}
const getters: GetterTree<AuthState, RootState> = {
  [PostGetters.checkAuthentication](): any {
    return state.checkAuthentication;
  },
};

export enum PostMutations {
  CHECK_AUTH = "CHECK_AUTH",
  LOGOUT = "LOGOUT",
}

const mutations: MutationTree<AuthState> = {
  [PostMutations.CHECK_AUTH](state, payload: Array<any>) {
    if (payload[0]) {
      state.checkAuthentication = payload[0];
      localStorage.setItem("auth", payload[0]);
      localStorage.setItem("user", payload[1].username);
      localStorage.setItem("jwt", "token se de o day");
    }
  },
  [PostMutations.LOGOUT](state) {
    state.checkAuthentication = false;
    localStorage.clear();
  },
};

const actions: ActionTree<AuthState, RootState> = {
  async checkAuth({ commit }, val: any): Promise<any> {
    try {
      const res = await axios.post("http://localhost:1234/auth/login", {
        username: val[0],
        password: val[1],
      });
      // console.log(res);
      commit("CHECK_AUTH", res.data);

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  logout({ commit }) {
    commit("LOGOUT");
    router.push("/login");
  },
};

export const Auth: Module<AuthState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
