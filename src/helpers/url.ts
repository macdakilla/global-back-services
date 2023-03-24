export const getQueryParam = (url: string, param: string): string => {
  const searchParams = new URLSearchParams(url.split("?")[1]);
  return searchParams.has(param) ? searchParams.get(param) || "" : "";
};
