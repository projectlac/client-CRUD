import axios from "axios";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { RootState } from "../types";
import { MatchState } from "./types";

const state: MatchState = {
  listMatch: [],
  listGroup: [],
};
export enum MatchGetters {
  listMatch = "listMatch",
  listGroup = "listGroup",
}
const getters: GetterTree<MatchState, RootState> = {
  [MatchGetters.listMatch](): any {
    return state.listMatch;
  },
  [MatchGetters.listGroup](): any {
    return state.listGroup;
  },
};

export enum MatchMutations {
  GET_MATCH = "GET_MATCH",
  GET_GROUP = "GET_GROUP",
}
const mutations: MutationTree<MatchState> = {
  [MatchMutations.GET_MATCH](state, payload: Array<any>) {
    state.listMatch = payload;
  },
  [MatchMutations.GET_GROUP](state, payload: Array<any>) {
    state.listGroup = payload;
  },
};

const actions: ActionTree<MatchState, RootState> = {
  async getDataMatch({ commit }): Promise<Array<Object>> {
    try {
      const match = await axios.get("http://localhost:1234/match");
      const group = await axios.get("http://localhost:1234/groupmatch");
      commit("GET_MATCH", match.data);
      commit("GET_GROUP", group.data);

      return match.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  // async addCat({ commit }, val): Promise<any> {

  //   try {
  //     await axios.post("http://localhost:3000/shikigami/", {
  //       name: val.name,
  //       image: val.image,
  //       rank: val.rank,
  //       prioritized: val.prioritized,
  //     });

  //     const res = await axios.get("http://localhost:3000/shikigami/");
  //     commit("GET_DATA", res.data);
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // },
  // async delCat({ commit }, id: number): Promise<any> {
  //   try {
  //     await axios.delete(`http://localhost:3000/shikigami/${id}`);
  //     const res = await axios.get("http://localhost:3000/shikigami");
  //     commit("GET_DATA", res.data);
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // },

  // async updateCat({ commit }, val: any): Promise<any> {

  //   try {
  //     await axios.patch(`http://localhost:3000/shikigami/${val.id}`, {
  //       name: val.name,
  //       image: val.image,
  //       rank: val.rank,
  //       prioritized: val.prioritized,
  //     });

  //     const res = await axios.get("http://localhost:3000/shikigami");
  //     commit("GET_DATA", res.data);
  //     commit("REFRESH", -1);
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // },
};

export const Match: Module<MatchState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
