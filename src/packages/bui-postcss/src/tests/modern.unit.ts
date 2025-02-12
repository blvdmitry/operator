import fs from "fs";
import postcss from "postcss";
import config from "../postcss.config";

test("modern config", async () => {
  const modernConfig = config.modern();
  const input = fs.readFileSync(`${__dirname}/styles.css`);
  const output = await postcss(modernConfig.plugins).process(input, {
    from: "__placeholder-name.css",
  });

  expect(output.css).toMatchSnapshot();
});
