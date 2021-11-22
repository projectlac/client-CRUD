import axios from "axios";
// import FormData from "form-data";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { RootState } from "../types";
import { PostState } from "./types";
// import FormData from "form-data";
const state: PostState = {
  listPost: [],
  checkactive: -1,
};
export enum PostGetters {
  listPost = "listPost",
  checkactive = "checkactive",
}
const getters: GetterTree<PostState, RootState> = {
  [PostGetters.listPost](): any {
    return state.listPost;
  },
  [PostGetters.checkactive](): any {
    return state.checkactive;
  },
};

export enum PostMutations {
  GET_DATA = "GET_DATA",
  REFRESH = "REFRESH",
  ACTIVE = "ACTIVE",
}
const mutations: MutationTree<PostState> = {
  [PostMutations.GET_DATA](state, payload: Array<any>) {
    state.listPost = payload;
  },
  [PostMutations.REFRESH](state, payload: number) {
    state.checkactive = payload;
  },
  [PostMutations.ACTIVE](state, payload: number) {
    state.checkactive = payload;
  },
};
export enum ActionHelper {
  URL_IMG = "https://api.cloudinary.com/v1_1/onmyojiimage/image/upload",
  URL_DATABASE = "https://steady-flea-20.hasura.app/v1/graphql",
}
const HEADERS = {
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "02HINqqOLfSeljv1K8C6XB1qo2QpqdXG4pii6Mm8Il7PmKZjzb38XeEQ5x8ZatfO",
  },
};
// const URL_IMG = "https://api.cloudinary.com/v1_1/onmyojiimage/image/upload";
// const URL_DATABASE = "https://steady-flea-20.hasura.app/v1/graphql";
const actions: ActionTree<PostState, RootState> = {
  open({ commit }, val: number) {
    commit("ACTIVE", val);
  },
  async getData({ commit }): Promise<Array<Object>> {
    try {
      const res = await axios.post(
        ActionHelper.URL_DATABASE,
        JSON.stringify({
          query: `
            query {
              shikigami(order_by: {name: asc}) {
                id,
                img,
                name,
                rank,
                prioritized
              }
            }
          `,
        }),
        HEADERS
      );

      commit("GET_DATA", res.data.data.shikigami);
      // console.log(res.data.data.shikigami);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async addCat({ commit }, val): Promise<any> {
    const data = new FormData();
    data.append("file", val.image);
    data.append("upload_preset", "nkxb0rzk");
    axios.post(ActionHelper.URL_IMG, data).then((response) => {
      axios
        .post(
          ActionHelper.URL_DATABASE,
          JSON.stringify({
            query: `
          mutation {
            insert_shikigami_one(object: {img: "${response.data.url}", name: "${val.name}", rank: "${val.rank}", prioritized: "${val.prioritized}"}) {
              img
              name
              rank
              prioritized
            }
          }

        `,
          }),
          HEADERS
        )
        .then((res1) => {
          axios
            .post(
              ActionHelper.URL_DATABASE,
              JSON.stringify({
                query: `
                  query {
                    shikigami(order_by: {name: asc}) {
                      id,
                      img,
                      name,
                      rank,
                      prioritized
                    }
                  }
                `,
              }),
              HEADERS
            )
            .then((res) => {
              commit("GET_DATA", res.data.data.shikigami);
            });
        });
    });
  },
  async delCat({ commit }, id: number): Promise<any> {
    try {
      await axios.post(
        ActionHelper.URL_DATABASE,
        JSON.stringify({
          query: `
          mutation {
            delete_shikigami_by_pk(id: ${id}) {
              id
            }
          }
          
        `,
        }),
        HEADERS
      );
      const res = await axios.post(
        ActionHelper.URL_DATABASE,
        JSON.stringify({
          query: `
            query {
              shikigami(order_by: {name: asc}) {
                id,
                img,
                name,
                rank,
                prioritized
              }
            }
          `,
        }),
        HEADERS
      );
      commit("GET_DATA", res.data.data.shikigami);
      return res.data.data.shikigami;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async updateCat({ commit }, val: any): Promise<any> {
    try {
      if (val.image) {
        const data = new FormData();
        data.append("file", val.image);
        data.append("upload_preset", "nkxb0rzk");
        axios.post(ActionHelper.URL_IMG, data).then((response) => {
          axios
            .post(
              ActionHelper.URL_DATABASE,
              JSON.stringify({
                query: `
          mutation {
            update_shikigami_by_pk(pk_columns: {id: ${val.id}}, _set: {name: "${val.name}", img: "${response.data.url}", prioritized: "${val.prioritized}", rank: "${val.rank}"}) {
              img
              name
              rank
              prioritized
            }
          }
          
          
        `,
              }),
              HEADERS
            )
            .then(() => {
              axios
                .post(
                  ActionHelper.URL_DATABASE,
                  JSON.stringify({
                    query: `
                    query {
                      shikigami(order_by: {name: asc}) {
                        id,
                        img,
                        name,
                        rank,
                        prioritized
                      }
                    }
                  `,
                  }),
                  HEADERS
                )
                .then((res) => {
                  commit("GET_DATA", res.data.data.shikigami);
                });
            });
        });
      } else {
        await axios.post(
          ActionHelper.URL_DATABASE,
          JSON.stringify({
            query: `
          mutation {
            update_shikigami_by_pk(pk_columns: {id: ${val.id}}, _set: {name: "${
              val.name
            }", ${val.image ? `img: "${val.image.name}",` : ""} prioritized: "${
              val.prioritized
            }", rank: "${val.rank}"}) {
              img
              name
              rank
              prioritized
            }
          }
        `,
          }),
          HEADERS
        );

        const res = await axios.post(
          ActionHelper.URL_DATABASE,
          JSON.stringify({
            query: `
              query {
                shikigami(order_by: {name: asc}) {
                  id,
                  img,
                  name,
                  rank,
                  prioritized
                }
              }
            `,
          }),
          HEADERS
        );
        commit("GET_DATA", res.data.data.shikigami);
      }
      commit("REFRESH", -1);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export const Post: Module<PostState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
