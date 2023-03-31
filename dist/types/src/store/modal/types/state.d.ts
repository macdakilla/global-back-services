export interface ModalParams {
    [key: string]: any;
}
export interface Modal {
    name: string;
    params?: ModalParams;
}
export interface State {
    active: boolean;
    modal: Modal | null;
}
