/* eslint-disable import/no-extraneous-dependencies */
import postcss from "postcss";

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
  const output = await postcss([postcssApply()]).process(input, {
    from: "__placeholder-name.css",
  });

  expect(output.css).toMatchSnapshot();
});
