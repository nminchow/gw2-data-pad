import { includes } from 'lodash';

const state = {
  bookmarks: [],
};

const mutations = {
  add(state, value) {
    if (includes(state.bookmarks, value)) return;
    state.bookmarks.push(value);
  },
  clear(state) {
    state.bookmarks = [];
  },
};

const actions = {
  add({ commit }, value) {
    commit('add', value);
  },
  clear({ commit }) {
    commit('clear');
  },
};

const getters = {
  bookmarks(state) {
    return state.bookmarks;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
