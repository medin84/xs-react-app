const HOST = ""; // process.env.HOST;
const URL_WS = "/";
const URL_LOGIN = "/";
const URL_PROFILE = "/profile";
const URL_VIEW = "/view";
const URL_DOCUMENT = "/document";

export default {
  isEnvProduction: process.env.NODE_ENV === "production",
  HOST: "/",
  API_HOST: "/api",
  URL_WS: HOST + URL_WS,
  URL_LOGIN: HOST + URL_LOGIN,
  URL_PROFILE: HOST + URL_PROFILE,
  URL_VIEW: HOST + URL_VIEW,
  URL_DOCUMENT: HOST + URL_DOCUMENT
};
