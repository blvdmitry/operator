import React from "react";
import env from "@bookingcom/bui-env-react";
import List from "components/List";
import Link from "components/Link";
import Text from "components/Text";

const fixtures = {
  content: [
    <Text>Minimum stay match with rate</Text>,
    <Text>10% of discount</Text>,
    <Text>Flexible rate</Text>,
    <Text>All Rooms</Text>,
    <Text>From July 7 to July 20</Text>,
  ],
  contentWithLinks: [
    <Link text="Minimum stay match with rate" href="/" />,
    <Link text="10% of discount" href="/" />,
    <Link text="Flexible rate" href="/" />,
    <Link text="All rooms" href="/" />,
    <Link text="From July 7 to July 20" href="/" />,
  ],
};

env.test.vrt({
  listDefault: <List>{fixtures.content}</List>,
  listDefaultSpacingSmall: <List rowSpacing="small">{fixtures.content}</List>,
  listDefaultSpacingLarge: <List rowSpacing="large">{fixtures.content}</List>,
  listDefaultSpacingNone: <List rowSpacing="none">{fixtures.content}</List>,
  listOrdered: <List variant="ordered">{fixtures.content}</List>,
  listUnordered: <List variant="unordered">{fixtures.content}</List>,
  listUpperAlpha: <List variant="upper-alpha">{fixtures.content}</List>,
  listDivided: <List divided>{fixtures.contentWithLinks}</List>,
});
