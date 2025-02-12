"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const postcss_1 = __importDefault(require("postcss"));
const postcssApply = require("../postcss.apply");
test("postcss.apply", async () => {
    const input = `
    .icon {
      @apply --bui_focus;
    }
    
    .heading {
      @apply (--bui_heading);
    }

    :root {
      --bui_focus {
        color: inherit;
      }
      --bui_heading: {
        font-size: 20px;
      }
    }
  `;
    const output = await (0, postcss_1.default)([postcssApply()]).process(input, {
        from: "__placeholder-name.css",
    });
    expect(output.css).toMatchSnapshot();
});
