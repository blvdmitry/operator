const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const postcssConfig = require("@bookingcom/bui-postcss");

const rootPath = path.resolve(__dirname, "../../..");
const bundlesOutputPath = path.resolve(rootPath, "dist/bundles");
const APP_DIR = path.resolve(rootPath, "src");

// Base config for bundle build
exports.bundle = ({ libraryName, cssBundleName, production, entry }) => ({
  mode: production ? "production" : "development",
  optimization: production
    ? {
        minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin({})],
      }
    : {
        minimize: false,
      },
  output: {
    path: bundlesOutputPath,
    filename: `${libraryName}.js`,
    // globalObject is an undocumented feature of Webpack
    // this is a workaround for https://github.com/webpack/webpack/issues/6784
    globalObject: "(typeof self !== 'undefined' ? self : this)",
    library: libraryName,
    libraryTarget: "umd",
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
  },
  devtool: "source-map",
  entry: path.resolve(APP_DIR, entry),
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${libraryName || cssBundleName}.css`,
    }),
  ],
  resolve: {
    modules: [APP_DIR, "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.build.json",
          compilerOptions: {
            emitDeclarationOnly: false,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
              },
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: false,
                plugins: postcssConfig.default.modern().plugins,
              },
            },
          },
        ],
      },
    ],
  },
});
