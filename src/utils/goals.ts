// @ts-nocheck
import { isClient } from "../helpers";

const YA_GOALS_LS_KEY = "yaGoals";
function getGoalsYm(): number[] {
  if (!isClient) return [];
  const localStorageGoals = localStorage.getItem(YA_GOALS_LS_KEY);
  // если есть коды в localStorage, то берём оттуда
  if (localStorageGoals) return JSON.parse(localStorageGoals);
  // Получаем все ключи объекта, начинающиеся с префикса "yaCounter"
  const keys = Object.keys(window).filter((key) => key.startsWith("yaCounter"));
  // Извлекаем цифры из ключей
  const numbers = keys.map((key) => parseInt(key.replace("yaCounter", "")));
  // Сохраняем в localStorage
  localStorage.setItem(YA_GOALS_LS_KEY, JSON.stringify(numbers));
  return numbers;
}
export const ymGoal = (code: string): void => {
  if (!code) return;
  if (typeof ym === "function") {
    const goals: number[] = getGoalsYm();
    goals.forEach((goal) => ym(goal, "reachGoal", code));
  }
};
export const gtmGoal = (code: string): void => {
  if (!code) return;
  if (typeof gtag == "function") {
    gtag("event", code + "_form", {
      event_category: code,
      event_action: "send",
    });
  }
  if (typeof dataLayer == "function") {
    dataLayer.push({
      event: "event-to-ga",
      eventCategory: code,
      eventAction: "send",
    });
  }
};
export const facebookPixelGoal = (code: string = "SubmitApplication") => {
  if (window["_fbq" as keyof typeof window] !== undefined) {
    fbq("track", code);
  }
};
