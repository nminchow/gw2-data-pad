const state = {
  bookmarks: [],
};

const mutations = {
  add(state, value) {
    state.bookmarks.push(value);
  },
  clear(state) {
    state.bookmarks = [];
  },
};

export default {
  state,
  mutations,
};
