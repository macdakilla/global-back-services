import { Modal, State } from "./state";

export enum MutationTypes {
  OPEN_DIALOG = "openModal",
  CLOSE_MODAL = "closeModal",
}
export interface Mutations<S = State> {
  [MutationTypes.OPEN_DIALOG](state: S, payload: Modal): void;
  [MutationTypes.CLOSE_MODAL](state: S): void;
}
