const path = require("path");

module.exports = {
  testEnvironment: "jsdom",
  rootDir: "../../../",
  roots: ["./src"],
  testMatch: ["**/*.unit.ts", "**/*.unit.tsx"],
  transform: {
    "\\.ts$": ["ts-jest"],
    "^.+\\.js$": require.resolve("babel-jest"),
  },
  setupFilesAfterEnv: ["./src/tools/jest/jest.setup.ts"],
  roots: ["./src"],
  preset: "ts-jest",
  moduleDirectories: ["node_modules", path.join(__dirname, "../../../src")],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/../../node_modules/jest-css-modules",
  },
  transformIgnorePatterns: ["/node_modules/(?!@bookingcom).+\\.js$"],
};
