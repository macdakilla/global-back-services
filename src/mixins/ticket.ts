import Vue from "vue";
import Api from "../api";
import { isFunction, isObject, isUndefined } from "../helpers";
import { facebookPixelGoal, getUTM, gtmGoal, ymGoal } from "../utils";

type FormContent = Record<string, any>;
export default Vue.extend({
  methods: {
    goals(form: FormContent) {
      ymGoal(form.code);
      gtmGoal(form.code);
      facebookPixelGoal();
    },
    async sendTicket(
      ticketData: any,
      successCallback?: Function,
      errorCallback?: Function
    ) {
      const form: FormContent = {
        page: window.location.href,
        ...ticketData,
        ...getUTM(),
      };
      const formData = new FormData();
      // преобразовываем объект в FormData
      Object.keys(form).forEach((key) => {
        if (isUndefined(form[key])) return;
        formData.append(key, form[key]);
      });
      // добавляем sessionId
      if ("ct" in window && typeof window.ct === "function") {
        formData.append(
          "sessionId",
          window.ct("calltracking_params")[0].sessionId
        );
      }
      // отправляем заявку на сервер, используя метод sendTicket из класса Api
      const response = await Api.sendTicket(formData);

      if (isObject(response) && response.status === "success") {
        // метрика
        this.goals(form);
        // колбек успешного выполнения
        if (successCallback && isFunction(successCallback)) successCallback();
      } else {
        // колбек ошибочного выполнения
        if (errorCallback && isFunction(errorCallback)) errorCallback();
      }
    },
  },
});
