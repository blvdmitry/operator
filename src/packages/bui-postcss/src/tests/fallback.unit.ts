import fs from "fs";
import postcss from "postcss";
import config from "../postcss.config";

test("fallback config", async () => {
  const fallbackConfig = config.fallback({ id: "traveller" });
  const input = fs.readFileSync(`${__dirname}/styles.css`);
  const output = await postcss(fallbackConfig.plugins).process(input, {
    from: "__placeholder-name.css",
  });

  expect(output.css).toMatchSnapshot();
});
