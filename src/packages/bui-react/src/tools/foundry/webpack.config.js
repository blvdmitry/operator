const cssConfig = require("@bookingcom/bui-postcss");

const config = {
  resolve: {
    extensions: [".css"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: false,
                plugins: cssConfig.default.modern().plugins,
              },
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;
