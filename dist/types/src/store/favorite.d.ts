interface State {
    items: any[];
}
declare const favoriteStore: {
    state: () => State;
    mutations: {
        addItem(state: State, item: any): void;
    };
};
export default favoriteStore;
