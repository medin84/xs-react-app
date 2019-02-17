const path = require("path");

module.exports = (defaultConfig, env) => {
  const isEnvDevelopment = env === "development";
  const isEnvProduction = env === "production";

  const overrides = [
    config => ({
      ...config,
      output: {
        ...config.output,
        publicPath: isEnvProduction
          ? "/SharedResources/xpage/react-app/build"
          : "/"
      }
    })
  ];

  return overrides.reduce((config, func) => func(config, env), defaultConfig);
};
