"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const postcss_1 = __importDefault(require("postcss"));
const responsiveVarsPlugin = require("../postcss.responsiveVars");
test("postcss.responsiveVars", async () => {
    const input = `
    @bui-responsive-vars .bui_mixin_width, mixin, width {
      @bui-unit;
      @bui-literal;
    };

    @bui-responsive-vars .bui_mixin_position, mixin, position {
      @bui-literal;
      @bui-important;
    };

    @bui-responsive-vars .bui_mixin_position, mixin, position;;
  `;
    const output = await (0, postcss_1.default)([responsiveVarsPlugin()]).process(input, {
        from: "__placeholder-name.css",
    });
    expect(output.css).toMatchSnapshot();
});
