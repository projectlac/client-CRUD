import axios from 'axios';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '../types';
import { AdminState } from './types';

const state: AdminState = {
  barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
  barImage: 'clint-mckoy.jpg',
  drawer: null,
};
export enum PostGetters {
  barColor = 'barColor',
  barImage = 'barImage',
  drawer = 'drawer',
}
const getters: GetterTree<AdminState, RootState> = {
  [PostGetters.barColor](): any {
    return state.barColor;
  },
  [PostGetters.barImage](): any {
    return state.barImage;
  },
  [PostGetters.drawer](): any {
    return state.drawer;
  },
};

export enum PostMutations {
  SET_BAR_IMAGE = 'SET_BAR_IMAGE',
  SET_DRAWER = 'SET_DRAWER',
}

const mutations: MutationTree<AdminState> = {
  [PostMutations.SET_BAR_IMAGE](state, payload: string) {
    state.barImage = payload;
  },
  [PostMutations.SET_DRAWER](state, payload: any) {
    state.drawer = payload;
  },
};

const actions: ActionTree<AdminState, RootState> = {
  // async checkAdmin({ commit }, val: any): Promise<any> {
  // },
};

export const Admin: Module<AdminState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
