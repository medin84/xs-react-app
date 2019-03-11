export default {
  isEnvProduction: process.env.NODE_ENV === "production",
  HOST: process.env.REACT_APP_HOST,
  API_HOST: process.env.REACT_APP_API_HOST,
  URL_WS: "/",
  URL_LOGIN: "/",
  URL_PROFILE: "/profile",
  URL_VIEW: "/view",
  URL_DOCUMENT: "/document"
};
