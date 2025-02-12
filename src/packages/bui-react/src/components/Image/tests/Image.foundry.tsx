import React from "react";
import { CreditCardCrossedIcon } from "@bookingcom/bui-assets-react/streamline";
import AspectRatio from "components/AspectRatio";
import Image from "components/Image";
import Stack from "components/Stack";
import Placeholder from "components/Placeholder";
import readme from "components/Image/Image.mdx";

export const controls = [
  {
    type: "string",
    label: "Src",
    propertyName: "src",
  },
  {
    type: "object",
    label: "Asset",
    propertyName: "asset",
    controls: [
      {
        type: "string",
        label: "Set name",
        propertyName: "setName",
      },
      {
        type: "string",
        label: "Asset name",
        propertyName: "assetName",
      },
    ],
    defaultValue: {
      setName: "illustrations-traveller",
      assetName: "WishlistEmptyState",
    },
  },
  {
    type: "string",
    label: "Alt",
    propertyName: "alt",
    defaultValue: "Wishlist illustration",
  },
  {
    type: "string",
    label: "Height",
    propertyName: "height",
  },
  {
    type: "string",
    label: "Width",
    propertyName: "width",
  },
  {
    type: "enum",
    label: "Content Mode",
    propertyName: "contentMode",
    options: [
      { label: "Fill", value: "fill" },
      { label: "Fit", value: "fit" },
    ],
    defaultValue: "fill",
  },
  {
    type: "enum",
    label: "Border Radius",
    propertyName: "borderRadius",
    options: [
      { label: "100", value: "100" },
      { label: "200", value: "200" },
      { label: "300", value: "300" },
    ],
  },
  {
    type: "enum",
    label: "Fallback Type",
    propertyName: "fallback",
    options: [
      { label: "Image", value: "image" },
      { label: "Icon", value: "icon" },
      { label: "Background", value: "background" },
      { label: "None", value: null },
    ],
    defaultValue: null,
  },
  {
    type: "string",
    label: "Fallback Image Src",
    propertyName: "fallbackImageSrc",
  },
  {
    type: "icon",
    label: "Fallback Icon",
    propertyName: "fallbackIcon",
  },
  {
    type: "boolean",
    label: "Fallback Image",
    propertyName: "fallbackImage",
  },
  {
    type: "enum",
    label: "Fallback Image Padding",
    propertyName: "fallbackImagePadding",
    options: [
      { label: "None", value: "none" },
      { label: "Small", value: "small" },
      { label: "Large", value: "large" },
    ],
    defaultValue: "large",
  },
  {
    type: "boolean",
    label: "Priority",
    propertyName: "priority",
  },
];

const imageList = new Array(12).fill("");

export default {
  name: "Components/Utilities/Image",
  readme,
  keywords: ["img", "picture"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Image"],
    },
  },
  playground: {
    template: (props: any) => {
      return <Image {...props} />;
    },
    controls,
  },
  examples: {
    default: {
      template: () => (
        <Image
          src="https://picsum.photos/200"
          height={200}
          width={200}
          alt="Random picture"
        />
      ),
    },
    contentMode: {
      template: () => (
        <Stack>
          <Image
            src="https://picsum.photos/400/300"
            height={200}
            width={200}
            alt="Random picture"
          />
          <Image
            src="https://picsum.photos/400/300"
            height={200}
            width={200}
            contentMode="fit"
            alt="Random picture"
          />
        </Stack>
      ),
    },
    presentation: {
      template: () => (
        <Stack>
          {imageList.map((index, i) => (
            <Image
              key={index}
              src={`https://picsum.photos/250/21${i}`}
              height={200}
              width={328}
              alt="A random image from Unsplash"
            />
          ))}
        </Stack>
      ),
    },
    aspectRatio: {
      template: () => (
        <AspectRatio ratio="16:9">
          <Image
            src="https://picsum.photos/250/213"
            alt="A random image from Unsplash"
          />
        </AspectRatio>
      ),
    },
    fallbacks: {
      template: () => (
        <Stack>
          <AspectRatio ratio="4:3">
            <Image
              src="error in src url"
              alt="Fallback set to an illustration"
              fallback="image"
              fallbackImage={<Placeholder width="100%" height="100%" />}
            />
          </AspectRatio>
          <AspectRatio ratio="4:3">
            <Image
              src="error in src url"
              alt="Fallback set to an icon"
              fallback="icon"
              fallbackIcon={CreditCardCrossedIcon}
            />
          </AspectRatio>
          <AspectRatio ratio="4:3">
            <Image
              src="error in src url"
              alt="Fallback set to an icon"
              fallback="icon"
            />
          </AspectRatio>
          <AspectRatio ratio="4:3">
            <Image
              src="error in src url"
              alt="Fallback set to background"
              fallback="background"
            />
          </AspectRatio>
          <AspectRatio ratio="4:3">
            <Image
              src="error in src url"
              alt="No fallback set"
              fallback={null}
            />
          </AspectRatio>
        </Stack>
      ),
    },
    illustration: {
      template: () => (
        <Image
          asset={{
            setName: "illustrations-traveller",
            assetName: "WishlistEmptyState",
          }}
          alt="Wishlist empty state"
        />
      ),
    },
    responsive: {
      template: () => (
        <Image
          src="https://picsum.photos/250/214"
          height={{ s: 200, m: 150 }}
          width={{ s: "100%", m: 150 }}
          alt="A random image from Unsplash"
        />
      ),
    },
  },
};
