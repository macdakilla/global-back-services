export interface NoContentResponse {
  status: "success";
  code: number;
}
class Request {
  static baseURL: string;

  static async post(
    url: string,
    body: any,
    headers: object = {}
  ): Promise<any> {
    const response = await fetch(`${Request.baseURL}${url}`, {
      method: "POST",
      headers: { ...headers },
      body,
    });

    if ([204, 201].includes(response.status)) {
      // no content
      return Promise.resolve({
        status: "success",
        code: response.status,
      } as NoContentResponse);
    }

    if (response.ok) {
      return await response.json();
    }

    const errorResponse = await response.json();
    return Promise.reject(errorResponse);
  }
}
export default Request;