import gettingStarted from "./getting-started.mdx";
import usingFoundations from "./using-foundations.mdx";
import otherTokens from "./other-tokens.mdx";
import migrations from "./migrations.mdx";
import hooks from "./hooks.mdx";
import components from "./principles/components.mdx";
import techRadar from "./principles/tech-radar.mdx";
import testing from "./principles/testing.mdx";

export default { name: "Getting started/Installation", readme: gettingStarted };

export const OtherTokens = {
  name: "Foundations/Other tokens",
  readme: otherTokens,
};
export const UsingFoundations = {
  name: "Foundations/Using foundations",
  readme: usingFoundations,
};
export const MajorRelease = {
  name: "Getting started/Major releases",
  readme: migrations,
};
export const hooksPage = { name: "Getting started/Hooks", readme: hooks };

export const componentsPabge = {
  name: "Getting started/Development/Components",
  readme: components,
};

export const testingPage = {
  name: "Getting started/Development/Testing",
  readme: testing,
};

export const techradar = {
  name: "Getting started/Development/Tech radar",
  readme: techRadar,
};

export const repository = {
  name: "Getting started/Repository",
  url: "https://gitlab.booking.com/design-systems/bui/bui-web",
};

export const iconography = {
  name: "Getting started/Iconography",
  url: "https://asset-service.booking.com/",
};
