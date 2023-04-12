import { Seo } from "../mixins/meta";
export interface Breadcrumb {
    url: string;
    name: string;
}
export interface Field {
    block_fields: {
        [key: string]: any;
    };
    component_path: string;
    name: string;
}
export interface Page {
    id: number;
    seo: Seo;
    model_id: null | number;
    blocks: Field[];
    breadcrumbs: Breadcrumb[];
    is_breadcrumbs: boolean;
}
