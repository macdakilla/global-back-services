export interface NoContentResponse {
    status: "success";
    code: number;
}
declare class Request {
    static post(url: string, body: any, headers?: object): Promise<any>;
    static get(url: string, headers?: object): Promise<any>;
}
export default Request;
