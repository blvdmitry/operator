module.exports = {
  rootDir: "../",
  testMatch: ["**/*.unit.ts", "**/*.unit.tsx"],
  transform: {
    "\\.ts$": ["ts-jest"],
    "^.+\\.js$": require.resolve("babel-jest"),
  },
  roots: ["./src"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.css$": "<rootDir>/../../node_modules/jest-css-modules",
  },
  globalSetup: "<rootDir>/tools/global-setup.js",
  transformIgnorePatterns: ["/node_modules/(?!@bookingcom).+\\.js$"],
};
