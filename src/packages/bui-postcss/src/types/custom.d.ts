declare module "@bookingcom/postcss-custom-media" {
  // eslint-disable-next-line import/no-duplicates
  import type { Plugin } from "postcss";

  const plugin: Plugin<{ preserve?: boolean }>;
  export default plugin;
}
declare module "postcss-css-variables" {
  // eslint-disable-next-line import/no-duplicates
  import type { Plugin } from "postcss";

  const plugin: Plugin<{}>;
  export default plugin;
}

declare module "autoprefixer" {
  // eslint-disable-next-line import/no-duplicates
  import type { Plugin } from "postcss";

  const plugin: Plugin<{}>;
  export default plugin;
}
