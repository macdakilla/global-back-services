import { RequestData } from "./store/filter/types/state";
import { FilterAPI } from "./types/filter";
class Api {
  static baseURL: string;

  static async getFilterData(
    request: RequestData
  ): Promise<FilterAPI | string> {
    try {
      const response = await fetch(`${Api.baseURL}/filter/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        return await response.json();
      }

      const errorResponse = await response.json();
      return Promise.resolve(errorResponse);
    } catch (error) {
      const errorResponse = "Unknown error occurred";
      return Promise.resolve(errorResponse);
    }
  }
}

export default Api;
