import { Promo, RequestData } from "./store/filter/types/state";
import { FilterAPI } from "./types/filter";
import { Request } from "./helpers";
import { NoContentResponse } from "./helpers/request";
import { Page } from "./types/page";

class Api extends Request {
  static async getFilterData(
    request: RequestData
  ): Promise<FilterAPI | string> {
    try {
      return await this.post("/filter/", JSON.stringify(request), {
        "Content-Type": "application/json",
      });
    } catch (error) {
      return Promise.resolve("Unknown error occurred");
    }
  }

  static async getRandomPromo(): Promise<Promo | string> {
    try {
      return await this.get("/promo/random/");
    } catch (error) {
      return Promise.resolve("Unknown error occurred");
    }
  }

  static async sendTicket(
    request: FormData
  ): Promise<NoContentResponse | string> {
    try {
      return await this.post("/ticket/", request);
    } catch (error) {
      return Promise.resolve("Unknown error occurred");
    }
  }
  static async getPage(url: string): Promise<Page | string> {
    try {
      return await this.post(
        "/constructor/pages/info/",
        JSON.stringify({ url }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (error) {
      return Promise.resolve("Unknown error occurred");
    }
  }
}

export default Api;
