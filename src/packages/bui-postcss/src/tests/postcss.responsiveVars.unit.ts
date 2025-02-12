/* eslint-disable import/no-extraneous-dependencies */
import postcss from "postcss";

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
  const output = await postcss([responsiveVarsPlugin()]).process(input, {
    from: "__placeholder-name.css",
  });

  expect(output.css).toMatchSnapshot();
});
