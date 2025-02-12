"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const postcss_1 = __importDefault(require("postcss"));
const postcss_config_1 = __importDefault(require("../postcss.config"));
test("modern config", async () => {
    const modernConfig = postcss_config_1.default.modern();
    const input = fs_1.default.readFileSync(`${__dirname}/styles.css`);
    const pluginsArray = Object.entries(
    // @ts-ignore
    modernConfig.plugins).reduce((plugins, [name, options]) => {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        return [...plugins, require(name)(options)];
    }, []);
    const output = await (0, postcss_1.default)(pluginsArray).process(input, {
        from: "__placeholder-name.css",
    });
    expect(output.css).toMatchSnapshot();
});
