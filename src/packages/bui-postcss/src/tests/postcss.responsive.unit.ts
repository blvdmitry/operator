/* eslint-disable import/no-extraneous-dependencies */
import postcss from "postcss";

const responsivePlugin = require("../postcss.responsive");

test("postcss.apply", async () => {
  const input = `
    @custom-media --bui_small_viewport (max-width: 575px);
    @custom-media --bui_medium_viewport (min-width: 576px);
    @custom-media --bui_large_viewport (min-width: 1024px);
    @custom-media --bui_xlarge_viewport (min-width: 1280px);

    @bui-responsive .container--variant {
      @bui-modifier primary, secondary {
        color: red;
      }
      
      @bui-modifier primary {
        padding: var(--bui_spacing_4x);
        background: red;
      }

      @bui-modifier secondary {
        padding: var(--bui_spacing_6x);
      }
    }
    
    @bui-responsive .container--elevated {
      @bui-modifier true {
        border: var(--bui_border_width_200) solid var(--bui_color_accent_border);
      }

      @bui-modifier false {
        border: none;
      }
    }
    
    @bui-responsive .container--direction > *:nth-child(n) {
      @bui-modifier column {
        margin-block-start: auto;
        margin-inline-start: initial;
      }
    }
    
    @bui-responsive .container--direction > .item--split {
      @bui-modifier column {
        margin-block-start: auto;
        margin-inline-start: initial;
      }
    }
    
    @bui-responsive * > .container--direction {
      @bui-modifier column {
        margin-block-start: auto;
        margin-inline-start: initial;
      }
    }
  `;
  const output = await postcss([responsivePlugin()]).process(input, {
    from: "__placeholder-name.css",
  });

  expect(output.css).toMatchSnapshot();
});
