import { ActionContext } from "vuex";
import { Mutations } from "./mutations";
import { State } from "./state";
export declare enum ActionTypes {
    UPDATE_DATA = "updateData"
}
type AugmentedActionContext = {
    commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;
export interface Actions {
    [ActionTypes.UPDATE_DATA]({ commit }: AugmentedActionContext, payload: {
        offLoading?: boolean;
    }): Promise<void>;
}
export {};
