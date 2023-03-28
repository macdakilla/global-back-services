import Vue from "vue";
import Api from "../api";
import { isFunction, isObject } from "../helpers";
import { getUTM } from "../utils";

export default Vue.extend({
  methods: {
    async sendTicket(
      ticketData: any,
      successCallback?: Function,
      errorCallback?: Function
    ) {
      const form = {
        page: window.location.href,
        ...ticketData,
        ...getUTM(),
      };
      const formData = new FormData();
      // преобразовываем объект в FormData
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      // отправляем заявку на сервер, используя метод sendTicket из класса Api
      const response = await Api.sendTicket(formData);

      if (isObject(response) && response.status === "success") {
        if (successCallback && isFunction(successCallback)) successCallback();
      } else {
        if (errorCallback && isFunction(errorCallback)) errorCallback();
      }
    },
  },
});
