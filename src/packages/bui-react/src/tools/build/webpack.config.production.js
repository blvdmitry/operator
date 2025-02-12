const config = require("./webpack.config.base");

module.exports = config.bundle({
  libraryName: "bundle",
  cssBundleName: "bundle",
  production: true,
  entry: "index.ts",
});
