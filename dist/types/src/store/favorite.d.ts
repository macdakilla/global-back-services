interface State {
    items: any[];
}
declare const favoriteStore: {
    namespaced: boolean;
    state: () => State;
    mutations: {
        addItem(state: State, item: any): void;
    };
};
export default favoriteStore;
