const path = require("path");

module.exports = (defaultConfig, env) => {
  const isEnvDevelopment = env === "development";
  const isEnvProduction = env === "production";
  const publicPath = isEnvProduction
    ? "/SharedResources/xpage/react-app/build"
    : "/";

  const overrides = [
    config => ({
      ...config,
      output: {
        ...config.output,
        publicPath: publicPath
      }
    })
  ];

  return overrides.reduce((config, func) => func(config, env), defaultConfig);
};
