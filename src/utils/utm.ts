import { getQueryParam, isClient } from "../helpers";

interface UTMLabels {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export const saveUTM = (): void => {
  if (isClient) {
    const location = window.location.href;
    const utm: UTMLabels = {
      utm_source: getQueryParam(location, "utm_source") || undefined,
      utm_medium: getQueryParam(location, "utm_medium") || undefined,
      utm_campaign: getQueryParam(location, "utm_campaign") || undefined,
      utm_content: getQueryParam(location, "utm_content") || undefined,
      utm_term: getQueryParam(location, "utm_term") || undefined,
    };
    for (const utmKey in utm) {
      if (utm[utmKey as keyof UTMLabels]) {
        sessionStorage.setItem(utmKey, utm[utmKey as keyof UTMLabels]!);
      }
    }
  }
};

export const getUTM = (): UTMLabels => {
  if (isClient) {
    return {
      utm_source: sessionStorage.getItem("utm_source") || undefined,
      utm_medium: sessionStorage.getItem("utm_medium") || undefined,
      utm_campaign: sessionStorage.getItem("utm_campaign") || undefined,
      utm_content: sessionStorage.getItem("utm_content") || undefined,
      utm_term: sessionStorage.getItem("utm_term") || undefined,
    };
  }
  return {};
};
