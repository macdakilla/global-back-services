interface State {
  items: any[];
}

const favoriteStore = {
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
