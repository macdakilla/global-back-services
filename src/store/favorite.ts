interface State {
  items: any[];
}

const favoriteStore = {
  namespaced: true,
  state: (): State => ({
    items: [],
  }),
  mutations: {
    addItem(state: State, item: any) {
      state.items.push(item);
    },
  },
};
export default favoriteStore;
