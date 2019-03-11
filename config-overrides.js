const path = require("path");

module.exports = (defaultConfig, env) => {
  const isEnvProduction = env === "production";

  const overrides = [
    config => ({
      ...config,
      output: {
        ...config.output,
        publicPath: isEnvProduction ? process.env.PUBLIC_URL : "/"
      }
    })
  ];

  return overrides.reduce((config, func) => func(config, env), defaultConfig);
};
