import { ActionContext } from "vuex";
import { Mutations } from "./mutations";
import { State } from "./state";
import { UpdateDataParams } from "../../../constants";
import { RangeTag, Tag } from "../../../utils";
export declare enum ActionTypes {
    UPDATE_DATA = "updateData",
    REMOVE_TAG = "removeTag"
}
type AugmentedActionContext = {
    commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;
export interface Actions {
    [ActionTypes.UPDATE_DATA]({ commit }: AugmentedActionContext, payload: UpdateDataParams): Promise<void>;
    [ActionTypes.REMOVE_TAG]({ commit }: AugmentedActionContext, payload: Tag | RangeTag): void;
}
export {};
